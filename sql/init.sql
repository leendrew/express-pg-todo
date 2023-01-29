create extension if not exists "uuid-ossp";

create type enum priority_type as enum {
  low
  medium
  high
}

create table todos (
  id uuid not null serial constraint todo_id_pk primary key,
  created_at timestamp not null default current_timestamp,
  task text not null,
  priority priority_type not null,
  is_completed boolean not null default false
);
