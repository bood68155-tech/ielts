/* ============================================================
   IELTS Master — Neon PostgreSQL Client
   ------------------------------------------------------------
   This module provides a PostgreSQL client using the Neon
   serverless driver for optimal performance in serverless/
   edge environments.

   For browser-based usage, this is loaded via the @neondatabase/
   serverless package or via a backend API layer.

   Tables (matching supabaseClient.js schema):
     users             – accounts (username, password hash, XP, claims)
     profiles          – display name, bio, target band, avatar, activity
     training_progress – zero-to-hero module progress
     exam_results      – weekly exam attempts
     posts             – shared community feed
     chat_messages     – real-time chat
     saved_words       – personal vocabulary builder
     study_log         – daily study hours + sessions

   Usage:
     // In Node.js/backend:
     import { neon } from '@neondatabase/serverless';
     export const sql = neon(process.env.DATABASE_URL);

     // For browser: Use via API routes or the Supabase client
     // This file provides compatibility helpers for migration
   ============================================================ */

// Check if running in Node.js environment
const isNode = typeof process !== 'undefined' && process.versions && process.versions.node;

// Neon serverless driver (Node.js/backend only)
let neon;
let sql;

if (isNode) {
  try {
    // Dynamic import for Neon serverless driver
    neon = require('@neondatabase/serverless');
  } catch (e) {
    // Fallback to pg if neon driver not available
    try {
      neon = require('pg');
    } catch (e2) {
      neon = null;
      console.warn('[NeonDB] Neither @neondatabase/serverless nor pg available. Install with: npm install @neondatabase/serverless');
    }
  }
}

// Database URL from environment
// Loaded from .env file or environment variables
const DATABASE_URL = process.env.DATABASE_URL 
  || 'postgresql://neondb_owner:npg_Eji7Y6olJKLV@ep-spring-queen-ayxl4iqh-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

// Initialize the database client
function initClient() {
  if (!DATABASE_URL) {
    console.warn('[NeonDB] DATABASE_URL not configured. Set it in .env file.');
    return null;
  }

  if (neon) {
    try {
      if (typeof neon === 'function') {
        // @neondatabase/serverless exports a neon function directly
        sql = neon(DATABASE_URL);
      } else if (neon.Pool) {
        // pg.Pool for standard PostgreSQL
        const { Pool } = neon;
        sql = new Pool({
          connectionString: DATABASE_URL,
          max: 10,
          idleTimeoutMillis: 30000,
          connectionTimeoutMillis: 2000,
        });
      } else {
        console.warn('[NeonDB] Unable to initialize database client.');
        return null;
      }
      return sql;
    } catch (e) {
      console.error('[NeonDB] Failed to initialize client:', e);
      return null;
    }
  }
  return null;
}

// Singleton client instance
let dbClient = null;

function getClient() {
  if (!dbClient) {
    dbClient = initClient();
  }
  return dbClient;
}

// Test the connection
async function testConnection() {
  const client = getClient();
  if (!client) {
    return { success: false, error: 'Database client not initialized' };
  }

  try {
    let result;
    if (typeof client === 'function') {
      // Neon serverless driver
      result = await client`SELECT NOW() as current_time, version() as version`;
    } else if (client.query) {
      // pg.Pool
      result = await client.query('SELECT NOW() as current_time, version() as version');
    } else {
      return { success: false, error: 'Unknown client type' };
    }

    return {
      success: true,
      data: result,
      timestamp: new Date().toISOString()
    };
  } catch (e) {
    return {
      success: false,
      error: e.message || String(e),
      timestamp: new Date().toISOString()
    };
  }
}

// Execute a parameterized query (safe from SQL injection)
async function query(sqlString, params = []) {
  const client = getClient();
  if (!client) {
    throw new Error('Database client not initialized');
  }

  try {
    if (typeof client === 'function') {
      // Neon serverless driver uses tagged template literals
      // For parameterized queries, use the sql tag
      const { neon } = require('@neondatabase/serverless');
      const parameterizedSql = neon(sqlString);
      const result = await parameterizedSql(...params);
      return result;
    } else if (client.query) {
      // pg.Pool
      const result = await client.query(sqlString, params);
      return result.rows;
    }
  } catch (e) {
    console.error('[NeonDB] Query failed:', e);
    throw e;
  }
}

// Health check endpoint data
async function getHealthStatus() {
  const result = await testConnection();
  return {
    database: 'neon-postgresql',
    connected: result.success,
    timestamp: result.timestamp,
    details: result.success ? 'Connection successful' : result.error
  };
}

// Export for Node.js/backend usage
if (isNode && typeof module !== 'undefined') {
  module.exports = {
    getClient,
    testConnection,
    query,
    getHealthStatus,
    initClient,
    isConfigured: () => !!DATABASE_URL
  };
}

// For browser usage, expose a minimal API on window
if (typeof window !== 'undefined') {
  window.NEON_DB = {
    isConfigured: () => !!DATABASE_URL,
    testConnection,
    getHealthStatus,
    // Note: Direct database queries from browser are not recommended
    // Use API routes or the Supabase client instead
    query: async () => {
      console.warn('[NeonDB] Direct queries from browser not supported. Use API routes.');
      return null;
    }
  };
}

/* ============================================================
   SQL Schema for Neon PostgreSQL
   ============================================================
   Run this in your Neon console to create the required tables:

   -- Enable UUID extension
   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

   -- Users table (accounts)
   CREATE TABLE IF NOT EXISTS users (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     username TEXT UNIQUE NOT NULL,
     email TEXT,
     password_hash TEXT NOT NULL,
     xp INTEGER DEFAULT 0,
     claims TEXT[] DEFAULT '{}',
     created_at TIMESTAMPTZ DEFAULT NOW(),
     updated_at TIMESTAMPTZ DEFAULT NOW()
   );

   CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
   CREATE INDEX IF NOT EXISTS idx_users_id ON users(id);

   -- Profiles table
   CREATE TABLE IF NOT EXISTS profiles (
     user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
     display_name TEXT DEFAULT '',
     bio TEXT DEFAULT '',
     target_band TEXT,
     avatar TEXT,
     activity JSONB DEFAULT '[]',
     updated_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Training progress
   CREATE TABLE IF NOT EXISTS training_progress (
     user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
     data JSONB DEFAULT '{}',
     updated_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Exam results
   CREATE TABLE IF NOT EXISTS exam_results (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
     week INTEGER NOT NULL,
     score INTEGER,
     total INTEGER,
     seconds_used INTEGER,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );

   CREATE INDEX IF NOT EXISTS idx_exam_results_user_id ON exam_results(user_id);
   CREATE INDEX IF NOT EXISTS idx_exam_results_created_at ON exam_results(created_at);

   -- Community posts
   CREATE TABLE IF NOT EXISTS posts (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     author TEXT NOT NULL,
     avatar TEXT,
     level TEXT,
     text TEXT NOT NULL,
     attachment TEXT,
     image TEXT,
     likes UUID[] DEFAULT '{}',
     comments JSONB DEFAULT '[]',
     system BOOLEAN DEFAULT FALSE,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );

   CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);

   -- Chat messages
   CREATE TABLE IF NOT EXISTS chat_messages (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     room TEXT NOT NULL,
     sender TEXT NOT NULL,
     sender_avatar TEXT,
     kind TEXT DEFAULT 'message',
     text TEXT NOT NULL,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );

   CREATE INDEX IF NOT EXISTS idx_chat_messages_room ON chat_messages(room);
   CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at);

   -- Saved words (vocabulary builder)
   CREATE TABLE IF NOT EXISTS saved_words (
     user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
     data JSONB DEFAULT '{}',
     updated_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Study log
   CREATE TABLE IF NOT EXISTS study_log (
     user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
     data JSONB DEFAULT '{}',
     updated_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Enable Row Level Security (RLS)
   ALTER TABLE users ENABLE ROW LEVEL SECURITY;
   ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
   ALTER TABLE training_progress ENABLE ROW LEVEL SECURITY;
   ALTER TABLE exam_results ENABLE ROW LEVEL SECURITY;
   ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
   ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
   ALTER TABLE saved_words ENABLE ROW LEVEL SECURITY;
   ALTER TABLE study_log ENABLE ROW LEVEL SECURITY;
   ============================================================ */
