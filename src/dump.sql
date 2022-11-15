create table if not exists accounts (
	id serial primary key,
  	balance numeric
);

create table if not exists users (
	id serial primary key,
  	username text not null unique,
  	passwordUser text not null,
  	accountId integer references accounts(id)
);

create table if not exists transactions (
	id serial primary key,
  	debitedAccountId integer references accounts(id),
  	creditedAccountId integer references accounts(id),
  	valueTransaction numeric,
  	createdAt date
);