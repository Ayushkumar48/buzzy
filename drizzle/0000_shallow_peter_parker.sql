CREATE TABLE "buzzy" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "buzzy_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"firstname" varchar(255) NOT NULL,
	"lastname" varchar(255) NOT NULL,
	"username" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	CONSTRAINT "buzzy_username_unique" UNIQUE("username")
);
