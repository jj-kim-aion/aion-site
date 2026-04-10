import { PRODUCTS } from "../lib/data";
import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import { join } from "path";

// Load .env from project root
dotenv.config({path: join(process.cwd(), ".env")});

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function migrate() {
    console.log("🚀 Starting migration of products to Supabase...");

    for (const product of PRODUCTS) {
        console.log(`Migrating product: ${product.product_id}...`);

        const {error} = await supabase
            .from("products")
            .upsert({
                product_id: product.product_id,
                name: product.name,
                product_summary: product.product_summary,
                detailed_description: product.detailed_description,
                price: product.price,
                original_price: product.original_price || null,
                badge: product.badge || null,
                category: product.category,
                features: product.features,
                deliverables: product.deliverables,
                cta: product.cta,
                updated_at: new Date().toISOString()
            }, {onConflict: 'product_id'});

        if (error) {
            console.error(`❌ Failed to migrate ${product.product_id}:`, error.message);
        } else {
            console.log(`✅ Migrated ${product.product_id}`);
        }
    }

    console.log("🏁 Migration complete!");
}

migrate();
