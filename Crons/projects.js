const csv = require('csv-parser');
const fs = require('fs');
const Site = require('../Models/Site');
const Notification = require('../Models/Notification'); // Assurez-vous d'importer le modèle de notification si vous l'utilisez

async function projects() {
    console.log('Job 1 executed.');
    const data = await getDatafromCsv();

    await Promise.all(data.map(async (item) => { // Utilisation de async/await pour garantir que toutes les promesses sont résolues

        const existingData = await Site.findOne({ domain: item.domain });

        if (existingData) {
            const siteId = existingData._id; // Récupération de l'ID du site

            // Mettre à jour les données existantes
            existingData.domain = item.domain;
            existingData.name = item.name;
            existingData.affaire = item.affaire;
            existingData.affaire_status = item.affaire_status;
            existingData.start_pack_at = item.start_pack_at;
            existingData.end_pack_at = item.end_pack_at;
            existingData.statut = item.statut;
            existingData.type_ref = item.type_ref;
            existingData.keyword = item.keyword;
            existingData.primary_keyword = item.primary_keyword;
            existingData.priority = item.priority;
            existingData.isActive = item.isActive;
            existingData.updated_at = Date.now();

            old = await Site.findOneAndUpdate({_id:existingData._id},existingData,{ new: false });
            if(existingData._id=="65e886d1a45f4cbcc9d153e2"){
                console.log(existingData.start_pack_at)
                console.log(old.start_pack_at)
            }
            // Vérifier les changements et envoyer des notifications
            if (existingData.affaire != old.affaire) {
                await sendNotification(siteId, `The affaire_status of this website ${existingData.domain} is changed from ${existingData.affaire_status} to ${old.affaire_status}`);
            }
            if (existingData.affaire_status != old.affaire_status) {
                await sendNotification(siteId, `The affaire_status of this website ${existingData.domain} is changed from ${existingData.affaire_status} to ${old.affaire_status}`);
            }
            if (existingData.start_pack_at != old.start_pack_at) {
                await sendNotification(siteId, `The start pack date of this website ${existingData.domain} is changed from ${existingData.start_pack_at} to ${old.start_pack_at}`);
            }
            if (existingData.end_pack_at != old.end_pack_at) {
                await sendNotification(siteId, `The end pack date of this website ${existingData.domain} is changed from ${existingData.end_pack_at} to ${old.end_pack_at}`);
            }
            if (existingData.isActive != old.isActive) {
                await sendNotification(siteId, `The statut of this website ${existingData.domain} is changed from ${existingData.isActive} to ${old.isActive}`);
            }
        } else {
            // Créer un nouveau site s'il n'existe pas
            const newSite = new Site({
                domain: item.domain,
                name: item.name,
                affaire: item.affaire,
                affaire_status: item.affaire_status,
                start_pack_at: item.start_pack_at,
                end_pack_at: item.end_pack_at,
                statut: item.statut,
                type_ref: item.type_ref,
                keyword: item.keyword,
                primary_keyword: item.primary_keyword,
                priority: item.priority,
                isActive: item.isActive,
                user: "65e775d60d2258ce976d49c9",
                account: "65e76586ee8317e4c27afb9f"
            });

            await newSite.save();
        }
    }));
}

async function sendNotification(siteId, message) {
    const notif = new Notification({
        site: siteId,
        msg: message,
        link: `site/${siteId}`,
        created_at: Date.now()
    });

    await notif.save();
    // Assurez-vous que req.io est disponible pour envoyer des notifications
    // req.io.emit('notification', notif);
}

async function getDatafromCsv() {
    const pattern = /\b(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}\b/g;
    const data = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream('./data.csv')
            .pipe(csv())
            .on('data', (row) => {
                const name = row['SEO Nom'];
                if (name) {
                    const domain = name.match(pattern) || [];
                    if (domain.length > 0) {
                        const start_date = row['Date lancement Pack'];
                        const end_date = row['Date fin Pack'];
                        const isActive = row['Etat du site'].toUpperCase().includes("LIGNE".toUpperCase());

                        data.push({
                            domain: domain[0],
                            name: row['SEO Nom'],
                            user: row['Gestionnaire du SEO'],
                            affaire: row['Affaire associée'],
                            affaire_status: row['Statut de l\'affaire associée'],
                            start_pack_at: start_date,
                            end_pack_at: end_date,
                            statut: row['Statut'],
                            type_ref: row['Type de référencement'],
                            keyword: row['SEO - Mots-Clés Ciblés'],
                            primary_keyword: row['Mot clé principal'],
                            priority: row['SEO - Priorité'],
                            isActive: isActive
                        });
                    } 
                }
            })
            .on('end', () => {
                resolve(data);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

module.exports = projects;
