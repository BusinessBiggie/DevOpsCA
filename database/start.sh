#!/bin/bash

chown -R postgres:postgres "$PGDATA"

if [ ! -f "$PGDATA/PG_VERSION" ]; then
    echo "Setting up database..."
    
    su - postgres -c "/usr/lib/postgresql/15/bin/initdb -D $PGDATA"
    echo "host all all 0.0.0.0/0 trust" >> $PGDATA/pg_hba.conf
    echo "listen_addresses='*'" >> $PGDATA/postgresql.conf
    
    su - postgres -c "/usr/lib/postgresql/15/bin/pg_ctl -D $PGDATA start"
    sleep 3
    
    su - postgres -c "/usr/lib/postgresql/15/bin/psql -c \"CREATE USER anna WITH PASSWORD 'sletikkehardcoded';\""
    su - postgres -c "/usr/lib/postgresql/15/bin/createdb -O anna tabloid"
    
    su - postgres -c "/usr/lib/postgresql/15/bin/pg_ctl -D $PGDATA stop"
fi

# Start PostgreSQL
exec su - postgres -c "/usr/lib/postgresql/15/bin/postgres -D $PGDATA"