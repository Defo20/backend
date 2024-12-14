const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const airtableApiKey = "patBeZrQ0Q0au4viK.8b7adc0991a3686a608b08f01e7980d489def9bf813569f1eda39a7405b30a44"; // Airtable Personal Access Token
const baseId = "appGioPVG9j8tP0dX"; // Airtable Base ID
const tableName = "Profil"; // Airtable Tablo Adı

app.use(express.json());

app.post("/api/airtable", async (req, res) => {
    const data = req.body;

    try {
        // Dinamik olarak node-fetch'i import edin
        const fetch = (await import("node-fetch")).default;

        const response = await fetch(`https://api.airtable.com/v0/${baseId}/${tableName}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${airtableApiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        res.status(response.status).json(result);
    } catch (error) {
        console.error("Airtable API Hatası:", error);
        res.status(500).json({ error: "Proxy hatası", details: error });
    }
});

app.listen(port, () => {
    console.log(`Backend ${port} portunda çalışıyor.`);
});
