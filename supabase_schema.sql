-- 1. Create Order Status Enum
CREATE TYPE order_status AS ENUM ('pending', 'completed', 'failed', 'refunded');

-- 2. Create PRODUCTS table
CREATE TABLE products
(
    id                   BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    product_id           TEXT    NOT NULL UNIQUE, -- e.g., 'super-agent-playbook'
    name                 TEXT    NOT NULL,
    product_summary      TEXT    NOT NULL,
    detailed_description TEXT    NOT NULL,
    price                NUMERIC NOT NULL,
    original_price       NUMERIC,
    badge                TEXT,
    category             TEXT    NOT NULL CHECK (category IN ('playbook', 'config', 'toolkit', 'bundle')),
    features             TEXT[] NOT NULL DEFAULT '{}',
    deliverables         TEXT[] NOT NULL DEFAULT '{}',
    cta                  TEXT    NOT NULL,
    created_at           TIMESTAMPTZ DEFAULT NOW(),
    updated_at           TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create ORDERS table
CREATE TABLE orders
(
    id                BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    order_id          TEXT         NOT NULL UNIQUE,                           -- e.g., ORD-XXXX-XXXX
    stripe_session_id TEXT         NOT NULL UNIQUE,
    customer_email    TEXT         NOT NULL,
    product_id        TEXT         NOT NULL REFERENCES products (product_id), -- foreign key on the string product_id
    product_ref_id    BIGINT REFERENCES products (id),                        -- for joins (fast)
    amount_total      INTEGER      NOT NULL,                                  -- in cents
    currency          CHAR(3)      NOT NULL DEFAULT 'usd',
    status            order_status NOT NULL DEFAULT 'pending',
    created_at        TIMESTAMPTZ           DEFAULT NOW()
);

-- 4. Create DOWNLOAD_TOKENS table
CREATE TABLE download_tokens
(
    id             BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    token          UUID        NOT NULL UNIQUE DEFAULT gen_random_uuid(), -- The actual token used in links
    order_id       TEXT        NOT NULL REFERENCES orders (order_id),     -- Added FK constraint
    customer_email TEXT        NOT NULL,
    product_id     TEXT        NOT NULL,
    product_ref_id BIGINT REFERENCES products (id),
    order_ref_id   BIGINT REFERENCES orders (id),                         -- for joins (fast)
    expires_at     TIMESTAMPTZ NOT NULL,
    consumed_at    TIMESTAMPTZ,
    created_at     TIMESTAMPTZ                 DEFAULT NOW()
);

-- 5. Create Indexes for performance
CREATE INDEX idx_orders_product_id ON orders (product_id);
CREATE INDEX idx_orders_product_ref_id ON orders (product_ref_id);
CREATE INDEX idx_orders_customer_email ON orders (customer_email);
CREATE INDEX idx_tokens_product_id ON download_tokens (product_id);
CREATE INDEX idx_tokens_product_ref_id ON download_tokens (product_id);
CREATE INDEX idx_tokens_order_id ON download_tokens (order_id);
CREATE INDEX idx_tokens_order_ref_id ON download_tokens (order_ref_id);
