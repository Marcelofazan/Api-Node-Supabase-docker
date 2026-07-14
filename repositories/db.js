import Sequelize from 'sequelize';

import { createClient } from '@supabase/supabase-js';
import 'dotenv/config'

const supabase = createClient(process.env.SUPABASE_DB_URL, process.env.SUPABASE_SERVICE_KEY);
console.log(process.env);

const sequelize = new Sequelize('postgresql://postgres:db_s3rv3r_123@db.ncdiywtvargeyjrbegfi.supabase.co:5432/postgres', {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Often required for cloud environments like Supabase
    }
  }
});

export default { sequelize, supabase };

// Test connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
