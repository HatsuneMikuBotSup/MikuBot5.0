-- Table: MikuBot5.0.DailyImage

-- DROP TABLE IF EXISTS "MikuBot5.0"."DailyImage";

CREATE TABLE IF NOT EXISTS "MikuBot5.0"."DailyImage"
(
    "Id" integer NOT NULL,
    ending character varying(4) COLLATE pg_catalog."default" NOT NULL,
    blacklisted boolean NOT NULL DEFAULT false,
    submitter bigint NOT NULL,
    "timestamp" timestamp without time zone,
    CONSTRAINT "DailyImages_pkey" PRIMARY KEY ("Id")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS "MikuBot5.0"."DailyImage"
    OWNER to postgres;

-- Table: MikuBot5.0.DailyMessage

-- DROP TABLE IF EXISTS "MikuBot5.0"."DailyMessage";

CREATE TABLE IF NOT EXISTS "MikuBot5.0"."DailyMessage"
(
    "Id" bigint NOT NULL,
    "Likes" integer DEFAULT 0,
    "Dislikes" integer DEFAULT 0,
    "Flags" integer DEFAULT 0,
    CONSTRAINT "DailyMessage_pkey" PRIMARY KEY ("Id")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS "MikuBot5.0"."DailyMessage"
    OWNER to postgres;

-- Table: MikuBot5.0.DailyPosted

-- DROP TABLE IF EXISTS "MikuBot5.0"."DailyPosted";

CREATE TABLE IF NOT EXISTS "MikuBot5.0"."DailyPosted"
(
    "ImageId" integer NOT NULL,
    "MessageId" bigint NOT NULL,
    CONSTRAINT "DailyPosted_pkey" PRIMARY KEY ("ImageId", "MessageId"),
    CONSTRAINT "DailyPosted_ImageId_fkey" FOREIGN KEY ("ImageId")
        REFERENCES "MikuBot5.0"."DailyImage" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "DailyPosted_MessageId_fkey" FOREIGN KEY ("MessageId")
        REFERENCES "MikuBot5.0"."DailyMessage" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS "MikuBot5.0"."DailyPosted"
    OWNER to postgres;

-- Table: MikuBot5.0.Server

-- DROP TABLE IF EXISTS "MikuBot5.0"."Server";

CREATE TABLE IF NOT EXISTS "MikuBot5.0"."Server"
(
    "Id" bigint NOT NULL,
    prefix character varying(10) COLLATE pg_catalog."default" NOT NULL DEFAULT '!'::character varying,
    "Id_channel" bigint NOT NULL DEFAULT 0,
    name character varying(100) COLLATE pg_catalog."default" NOT NULL DEFAULT 'default'::character varying,
    members integer NOT NULL DEFAULT 0,
    active boolean NOT NULL DEFAULT true,
    blacklisted boolean NOT NULL DEFAULT false,
    CONSTRAINT "Server_pkey" PRIMARY KEY ("Id")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS "MikuBot5.0"."Server"
    OWNER to postgres;