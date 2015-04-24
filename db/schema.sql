DROP TABLE IF EXISTS dates;

CREATE TABLE dates(
	id INTEGER PRIMARY KEY AUTOINCREMENT, 
	user_name TEXT,
	address TEXT, 
	password TEXT, 
	phone_number TEXT, 
	pic TEXT, 
	create_at CURRENT_TIMESTAMP, 
	update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

  CREATE TRIGGER timestamp_update_categories BEFORE UPDATE ON dates BEGIN
  UPDATE dates SET updated_at = CURRENT_TIMESTAMP WHERE id = new.id;
  END;