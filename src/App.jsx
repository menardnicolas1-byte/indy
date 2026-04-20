import { useState } from "react";
// --- CONFIG ------------------------------------------------------------------
// 200 fondateurs max — TODO: brancher sur Supabase COUNT(users WHERE plan != 'free')
const MEMBER_COUNT = 47;
const IS_FONDATEUR = MEMBER_COUNT < 200;
const PRICES = {
artiste_fondateur: "price_1TODOE0aQuevE1QtePnpoIz6",
artiste_standard: "price_1TODOG0aQuevE1QtMpBThg5S",
label_fondateur: "price_1TODOI0aQuevE1Qtr1kCGHb3",
label_standard: "price_1TODOL0aQuevE1QtRrMdgkyc",
label_artiste_supp:"price_1TODTy0aQuevE1QtQfoGQHUl",
};
const AFF = {
distrokid: "https://distrokid.com/vip/seven/TONCODE",
tunecore: "https://www.tunecore.com/?ref=TONCODE",
spotify: "https://artists.spotify.com",
sacem: "https://www.sacem.fr/cms/home/la-sacem/rejoindre-la-sacem",
isrc: "https://www.scpp.fr/SCPP/fr/Les-Services/ISRC/L-ISRC.aspx",
cnm: "https://cnm.fr/aides/",
drac: "https://www.culture.gouv.fr/Regions",
irma: "https://www.irma.asso.fr",
adami: "https://www.adami.fr/artiste/aides-et-bourses/",
spedidam: "https://www.spedidam.fr/aides/",
ifcic: "https://www.ifcic.fr/",
kkbb: "https://www.kisskissbankbank.com/",
bandsintown:"https://www.bandsintown.com/artist-signup",
groover: "https://groover.co/?ref=indy",
};
// --- COACH DATA ---------------------------------------------------------------
const STAGES = [
{ id:"creation", label:"Créer", icon:" ", color:"#FF6B35" },
{ id:"protection", label:"Protéger", icon:" ", color:"#00C9A7" },
{ id:"distribution", label:"Distribuer", icon:" ", color:"#845EF7" },
{ id:"promotion", label:"Promouvoir", icon:" ", color:"#FFD43B" },
{ id:"financement", label:"Financer", icon:" ", color:"#F03E3E" },
{ id:"live", label:"Performer", icon:" ", color:"#20C997" },
];
const TASKS = {
creation:[
{id:"c1",text:"Composition & arrangement finalisés",tip:"Fais écouter à 3 personnes extér
{id:"c2",text:"Mix professionnel (niveaux, EQ, compression)",tip:"Référence ton mix avec
{id:"c3",text:"Master aux normes streaming (-14 LUFS)",tip:"DistroKid et Spotify normalis
{id:"c4",text:"Titre et durée définis",tip:"Entre 2:30 et 3:30 pour maximiser les écoutes
{id:"c5",text:"Featuring / co-prod documentés",tip:"Prévoir le partage de droits AVANT la
],
protection:[
{id:"p1",text:"Œuvre déposée à la SACEM",tip:"Déposer AVANT la distribution."},
{id:"p2",text:"Co-auteurs et répartitions définis",tip:"Chaque part doit être convenue pa
{id:"p3",text:"ISRC généré ou demandé au distributeur",tip:"DistroKid l'attribue automati
{id:"p4",text:"Samples clearés ou libres de droits",tip:"Un sample non clearé peut faire
{id:"p5",text:"Contrat signé avec les featuring",tip:"Un accord simple par email vaut mie
],
distribution:[
{id:"d1",text:"Distributeur choisi",tip:"DistroKid = rapidité. TuneCore = contrôle total.
{id:"d2",text:"Artwork 3000x3000px validé",tip:"Spotify rejette les artworks flous."},
{id:"d3",text:"Metadata complètes",tip:"Des metadata précises améliorent la découvrabilit
{id:"d4",text:"Date de sortie fixée (min. 3 semaines)",tip:"7 semaines pour le pitch édit
{id:"d5",text:"Pitch éditorial Spotify envoyé",tip:"Une seule chance par sortie."},
mots).
],
promotion:[
{id:"pr1",text:"Press kit artiste à jour",tip:"Bio courte (100 mots) + longue (300 {id:"pr2",text:"Contenu TikTok / Reels préparé",tip:"3 à 5 vidéos prêtes le jour J."},
{id:"pr3",text:"Blogs & playlists contactés (J-14)",tip:"Pitcher 2 semaines avant."},
{id:"pr4",text:"Smart link créé",tip:"Un seul lien dans la bio."},
{id:"pr5",text:"Plan de posts semaine 1 défini",tip:"Lundi teaser · Mercredi sortie · Ven
],
financement:[
{id:"f1",text:"Dossier CNM vérifié",tip:"Aides à la production, clip, tournée."},
{id:"f2",text:"Aides SACEM explorées",tip:"Bourse Création, aide numérique."},
{id:"f3",text:"Dispositifs régionaux & DRAC identifiés",tip:"Chaque région a ses propres
{id:"f4",text:"Résidences artistiques consultées",tip:"Studio gratuit + accompagnement."}
{id:"f5",text:"Crowdfunding envisagé",tip:"Ta communauté finance ET promeut."},
],
live:[
{id:"l1",text:"EPK live créé",tip:"Bio + vidéo live + rider technique."},
{id:"l2",text:"Liste de salles cibles établie",tip:"Commence par 50-100 personnes."},
{id:"l3",text:"Mail de démarchage rédigé",tip:"Court, direct, lien EN PREMIER."},
{id:"l4",text:"Plateformes de booking consultées",tip:"Bandsintown Pro pour contacter des
{id:"l5",text:"Première partie visée",tip:"Souvent plus accessible que booker solo."},
],
};
const INIT_PROJECTS = [];
const PLANS = [
{id:"free",name:"ESSAI 3 JOURS",price:"0€",period:"",color:"#999",features:["Dashboard + Co
{id:"artiste",name:"ARTISTE",price:IS_FONDATEUR?"9,90€":"14,90€",priceFutur:IS_FONDATEUR?"p
{id:"label",name:"STUDIO / LABEL",price:IS_FONDATEUR?"29,90€":"34,90€",priceFutur:IS_FONDAT
];
// --- SALLES -------------------------------------------------------------------
const SALLES = [
{id:1,nom:"Le Trabendo",ville:"Paris",region:"idf",type:"smac",jauge:350,cachet_min:800,cac
{id:2,nom:"La Cigale",ville:"Paris",region:"idf",type:"prive",jauge:1900,cachet_min:2000,ca
{id:3,nom:"Le Flow",ville:"Paris",region:"idf",type:"club",jauge:600,cachet_min:500,cachet_
{id:4,nom:"Point Éphémère",ville:"Paris",region:"idf",type:"smac",jauge:300,cachet_min:400,
{id:5,nom:"La Maroquinerie",ville:"Paris",region:"idf",type:"prive",jauge:400,cachet_min:60
{id:6,nom:"La Boule Noire",ville:"Paris",region:"idf",type:"prive",jauge:350,cachet_min:500
{id:7,nom:"Centre Senghor",ville:"Paris",region:"idf",type:"cult",jauge:300,cachet_min:400,
{id:8,nom:"L'Espace Michel Simon",ville:"Noisy-le-Grand",region:"idf",type:"smac",jauge:600
{id:9,nom:"Le Molotov",ville:"Marseille",region:"paca",type:"smac",jauge:200,cachet_min:400
{id:10,nom:"Espace Julien",ville:"Marseille",region:"paca",type:"smac",jauge:1500,cachet_mi
{id:11,nom:"L'Embobineuse",ville:"Marseille",region:"paca",type:"smac",jauge:150,cachet_min
{id:12,nom:"La Salle des Machines",ville:"Lyon",region:"aura",type:"smac",jauge:500,cachet_
{id:13,nom:"Transbordeur",ville:"Villeurbanne",region:"aura",type:"prive",jauge:1500,cachet
{id:14,nom:"Le Sonic",ville:"Lyon",region:"aura",type:"smac",jauge:200,cachet_min:300,cache
{id:15,nom:"Le Bikini",ville:"Toulouse",region:"occitanie",type:"smac",jauge:1500,cachet_mi
{id:16,nom:"Le Metronum",ville:"Toulouse",region:"occitanie",type:"smac",jauge:800,cachet_m
{id:17,nom:"L'Ubu",ville:"Rennes",region:"bretagne",type:"smac",jauge:400,cachet_min:500,ca
{id:18,nom:"La Laiterie",ville:"Strasbourg",region:"alsace",type:"smac",jauge:900,cachet_mi
{id:19,nom:"Le Splendid",ville:"Lille",region:"nord",type:"smac",jauge:800,cachet_min:600,c
{id:20,nom:"L'Aéronef",ville:"Lille",region:"nord",type:"smac",jauge:1000,cachet_min:700,ca
{id:21,nom:"I.Boat",ville:"Bordeaux",region:"bordeaux",type:"smac",jauge:400,cachet_min:400
{id:22,nom:"Rock School Barbey",ville:"Bordeaux",region:"bordeaux",type:"smac",jauge:600,ca
{id:23,nom:"Le Rocher de Palmer",ville:"Cenon",region:"bordeaux",type:"smac",jauge:1200,cac
];
const OPPOS = [
{id:1,salle:"Le Trabendo",ville:"Paris",date:"2025-07-12",genre:"Afro / R&B",jauge:350,cach
{id:2,salle:"La Salle des Machines",ville:"Lyon",date:"2025-09-05",genre:"Tout genres",jaug
{id:3,salle:"Le Molotov",ville:"Marseille",date:"2025-06-28",genre:"Hip-hop / Afro",jauge:2
{id:4,salle:"Le Flow",ville:"Paris",date:"2025-06-14",genre:"Afrobeats / Dancehall",jauge:4
{id:5,salle:"L'Ubu",ville:"Rennes",date:"2025-10-18",genre:"Émergence tout genres",jauge:20
];
// --- ANNUAIRE DATA ------------------------------------------------------------
const STUDIOS_ENREG = [
{nom:"Studio Gang",ville:"Paris 10e",prix:"80€/h",contact:"studiogangparis@gmail.com",desc:
{nom:"Black Box Studio",ville:"Paris 18e",prix:"90€/h",contact:"blackboxparis.fr",desc:"Spé
{nom:"Volta Studio",ville:"Paris 18e",prix:"70€/h",contact:"voltastudio.fr",desc:"Studio po
{nom:"Studio des Dames",ville:"Paris 9e",prix:"65€/h",contact:"studiodesdames.fr",desc:"Amb
{nom:"Studio Ferber",ville:"Paris 16e",prix:"120€/h",contact:"studioferber.com",desc:"Studi
{nom:"Sun Studio Marseille",ville:"Marseille",prix:"55€/h",contact:"sunstudio13.com",desc:"
{nom:"Studio La Friche",ville:"Marseille",prix:"50€/h",contact:"lafriche.org",desc:"Dans la
{nom:"Studio Aquarium",ville:"Lyon",prix:"60€/h",contact:"studioaquarium.fr",desc:"Studio a
{nom:"Studio Davout",ville:"Paris 20e",prix:"55€/h",contact:"studiodavout.fr",desc:"Studio
{nom:"Studio Midlands",ville:"Toulouse",prix:"50€/h",contact:"studiomidlands.fr",desc:"Stud
{nom:"Studio Nemo",ville:"Bordeaux",prix:"55€/h",contact:"studionemo33.fr",desc:"Studio bor
{nom:"Studio Barbey",ville:"Bordeaux",prix:"45€/h",contact:"rockschool-barbey.com",desc:"St
{nom:"ICP Studios",ville:"Bruxelles",prix:"85€/h",contact:"icpstudios.be",desc:"Un des meil
{nom:"MixMaster FR",ville:"En ligne",prix:"Dès 80€/titre",contact:"mixmasterfr.com",desc:"M
];
const STUDIOS_REPET = [
{nom:"Répèt Nation",ville:"Paris 11e",prix:"15€/h",contact:"repetnation.fr",desc:"20 salles
{nom:"My Music",ville:"Paris 18e",prix:"12€/h",contact:"mymusicrepet.fr",desc:"Réseau de sa
{nom:"Studio Répète",ville:"Paris 13e",prix:"14€/h",contact:"studiorepete.fr",desc:"Salles
{nom:"Studio Glaz'Art",ville:"Paris 19e",prix:"13€/h",contact:"glazart.com",desc:"Répèt + s
{nom:"La Halle Tropisme",ville:"Montpellier",prix:"10€/h",contact:"tropisme.org",desc:"Lieu
{nom:"La Cave",ville:"Bordeaux",prix:"12€/h",contact:"lacavebdx.fr",desc:"Salles de répète
{nom:"Studio Tempo",ville:"Toulouse",prix:"10€/h",contact:"studiotempo31.com",desc:"Réseau
{nom:"Répète à Gogo",ville:"Lyon",prix:"11€/h",contact:"repeteagogo.fr",desc:"Réseau lyonna
{nom:"La Cartoucherie",ville:"Toulouse",prix:"9€/h",contact:"lacartoucherietoulouse.fr",des
{nom:"Studio Rock Academy",ville:"Lille",prix:"10€/h",contact:"rockacademylille.fr",desc:"R
{nom:"Espace Son",ville:"Marseille",prix:"11€/h",contact:"espaceson13.fr",desc:"Studios de
];
const RESIDENCES = [
{nom:"La Villette — Résidences",ville:"Paris",prix:"Gratuit (dossier)",contact:"lavillette.
{nom:"Château de Goutelas",ville:"Loire",prix:"Hébergement inclus",contact:"chateaugoutelas
{nom:"Le 6b",ville:"Saint-Denis",prix:"Dossier",contact:"le6b.fr",desc:"Tiers-lieu artistiq
{nom:"Cité de la Musique",ville:"Paris",prix:"Sur dossier",contact:"philharmoniedeparis.fr"
{nom:"Le Quartz",ville:"Brest",prix:"Hébergement inclus",contact:"lequartz.com",desc:"Scène
{nom:"La Condition Publique",ville:"Roubaix",prix:"Variable",contact:"laconditionpublique.c
{nom:"Le Lieu Unique",ville:"Nantes",prix:"Sur dossier",contact:"lelieuunique.com",desc:"Sc
{nom:"Récréâtrales",ville:"Bordeaux",prix:"Hébergement inclus",contact:"recreartrales.fr",d
{nom:"IRCAM",ville:"Paris",prix:"Sur concours",contact:"ircam.fr",desc:"Institut de créatio
{nom:"L'Astrobale",ville:"Lyon",prix:"Variable",contact:"lastrobale.fr",desc:"Résidences de
];
const TREMPLINS = [
{nom:"Les Inrocks Lab",ville:"Paris",deadline:"Annuel · Oct.",prix:"Tournée + accompagnemen
{nom:"Découvertes RFI",ville:"Paris",deadline:"Annuel · Janv.",prix:"Diffusion internationa
{nom:"Printemps de Bourges",ville:"Bourges",deadline:"Annuel · Nov.",prix:"Date au festival
{nom:"Trans Musicales — OFF",ville:"Rennes",deadline:"Annuel · Sept.",prix:"Date au festiva
{nom:"Francofolies — Tremplin",ville:"La Rochelle",deadline:"Annuel · Mars",prix:"Date au f
{nom:"Lyon Tremplin",ville:"Lyon",deadline:"Annuel · Fév.",prix:"Tournée 5 dates + studio",
{nom:"Scène Émergence",ville:"Bordeaux",deadline:"Mensuel",prix:"Date + EPK",contact:"scene
{nom:"Jams de Paris",ville:"Paris",deadline:"Hebdo",prix:"Scène + réseau",contact:"jamsepar
{nom:"Chérie FM Révélation",ville:"National",deadline:"Annuel",prix:"Diffusion radio",conta
{nom:"Victoires — Révélation",ville:"Paris",deadline:"Annuel · Oct.",prix:"Nomination TV",c
];
// --- AIDES & DÉMARCHES --------------------------------------------------------
const AIDES = [
{id:"cnm_prod",nom:"CNM — Production phonographique",org:"Centre National de la Musique",ic
{id:"cnm_clip",nom:"CNM — Aide au clip vidéo",org:"Centre National de la Musique",icon:" "
{id:"cnm_tournee",nom:"CNM — Aide aux tournées",org:"Centre National de la Musique",icon:"
{id:"sacem_bourse",nom:"SACEM — Bourse à la création",org:"SACEM",icon:" ",color:"#845EF7"
{id:"adami",nom:"ADAMI — Aides aux artistes",org:"ADAMI",icon:" ",color:"#F03E3E",montant:
{id:"spedidam",nom:"SPEDIDAM — Soutien musiciens",org:"SPEDIDAM",icon:" ",color:"#FFD43B",
{id:"drac",nom:"DRAC — Aide régionale",org:"Min. de la Culture",icon:" ",color:"#20C997",m
{id:"residence",nom:"Résidences artistiques",org:"Scènes nationales",icon:" ",color:"#C8A9
{id:"kkbb",nom:"Crowdfunding — KissKissBankBank",org:"Financement participatif",icon:" ",c
];
const DEMARCHES = [
{id:"sacem",icon:" ",titre:"Adhésion SACEM",color:"#845EF7",desc:"Dépose tes œuvres et per
{id:"isrc",icon:" ",titre:"Obtenir un code ISRC",color:"#FF6B35",desc:"Code unique interna
{id:"distribution",icon:" ",titre:"Formats de dépôt streaming",color:"#1DB954",desc:"Les s
{id:"autoentrepreneur",icon:" ",titre:"Devenir Auto-Entrepreneur",color:"#00C9A7",desc:"St
{id:"label",icon:" ",titre:"Créer son Label",color:"#C8A96E",desc:"Créer une structure pou
];
const FINANCEMENT_QS = [
{id:"statut",q:"Ton statut ?",opts:[{v:"auto",l:"Auto-entrepreneur"},{v:"intermittent",l:"I
{id:"sacem",q:"Membre SACEM ?",opts:[{v:"oui",l:"Oui"},{v:"non",l:"Non"},{v:"process",l:"En
{id:"projet",q:"Ton projet ?",opts:[{v:"album",l:"Album / EP"},{v:"clip",l:"Clip vidéo"},{v
{id:"budget",q:"Budget estimé ?",opts:[{v:"petit",l:"< 3 000 €"},{v:"moyen",l:"3k–15k €"},{
];
function scoreAide(a,ans){let s=0,m=0;m+=3;if(ans.statut&&a.statuts.includes(ans.statut))s+=3
// --- BIBLIOTHÈQUE DOCS -------------------------------------------------------
const BIBLIO_CATS = [
{id:"contrats", label:"Contrats & Accords", icon:" ", color:"#FF6B35"},
{id:"sacem", label:"SACEM & Droits", icon:" ", color:"#845EF7"},
{id:"distrib", label:"Distribution & Promotion", icon:" ", color:"#1DB954"},
{id:"finance", label:"Financements & Aides", icon:" ", color:"#F03E3E"},
{id:"statuts", label:"Statuts Juridiques", icon:" ", color:"#00C9A7"},
{id:"live", label:"Live & Technique", icon:" ", color:"#FFD43B"},
];
// access: "all"=artiste+label | "label"=label seulement
const BIBLIO_DOCS = [
// ── CONTRATS ──
{id:"feat",cat:"contrats",icon:" ",titre:"Contrat de Featuring",access:"all",
resume:"Encadre la participation d'un artiste invité — droits, rémunération, crédits.",
contenu:`CONTRAT DE FEATURING
Entre :
L'ARTISTE PRINCIPAL : [Nom / Scène], né(e) le [date], demeurant [adresse]
L'ARTISTE INVITÉ : [Nom / Scène], né(e) le [date], demeurant [adresse]
ARTICLE 1 – OBJET
L'Artiste Invité participe en qualité d'interprète au titre "[Titre]", d'une durée de [XX:XX]
ARTICLE 2 – DROITS D'AUTEUR
Répartition des droits :
• Composition : Principal [XX]% / Invité [XX]%
• Paroles : Principal [XX]% / Invité [XX]%
Chaque partie s'engage à déclarer sa part à la SACEM.
ARTICLE 3 – DROITS VOISINS
• Artiste Principal : [XX]%
• Artiste Invité : [XX]%
ARTICLE 4 – RÉMUNÉRATION
[ ] Cachet fixe : [XX] € à la signature
[ ] Partage recettes : [XX]% des recettes nettes
[ ] Gratuité convenue entre les parties
ARTICLE 5 – EXPLOITATION
L'Artiste Principal peut exploiter l'enregistrement sous toutes formes (streaming, télécharge
ARTICLE 6 – CRÉDITS
L'Artiste Invité sera crédité sous le nom "[Nom de scène]" sur tous supports.
ARTICLE 7 – DROIT APPLICABLE
Droit français. Tout litige devant les tribunaux de [Ville].
Fait à [Ville], le [Date]
Signature Artiste Principal : Signature Artiste Invité :`},
{id:"split",cat:"contrats",icon:" ",titre:"Split Sheet — Répartition des droits",access:"a
resume:"Document de référence pour fixer la répartition entre co-auteurs. À signer avant t
contenu:`SPLIT SHEET — RÉPARTITION DES DROITS
Titre : [Nom du titre]
Date de création : [Date]
ISRC (si dispo) : [Code]
Durée : [XX:XX]
DROITS D'AUTEUR
────────────────────────────────────────
Nom / Scène | Rôle | Compo | Paroles | SACEM
[Nom 1] | Compositeur | [XX]% | [XX]% | Oui/Non
[Nom 2] | Parolier | [XX]% | [XX]% | Oui/Non
[Nom 3] | Co-prod | [XX]% | [XX]% | Oui/Non
TOTAL | | 100% | 100% |
DROITS VOISINS (Interprètes)
────────────────────────────────────────
Nom / Scène | Rôle | Part
[Nom 1] | Artiste ppal | [XX]%
[Nom 2] | Featuring | [XX]%
TOTAL | | 100%
Ce document vaut accord entre les parties.
Chacun s'engage à déclarer sa part à la SACEM avant diffusion.
Signatures :
[Nom 1] — Date — Signature :
[Nom 2] — Date — Signature :`},
{id:"cession",cat:"contrats",icon:" ",titre:"Contrat de Cession de Droits Voisins",access:
resume:"Cède les droits d'interprétation à un producteur/label en échange d'un cachet ou r
contenu:`CONTRAT DE CESSION DE DROITS VOISINS
Entre :
LE PRODUCTEUR : [Raison sociale], SIRET [XXXXXXX], représenté par [Nom]
L'ARTISTE : [Nom / Scène], né(e) le [date], demeurant [adresse]
ARTICLE 1 – OBJET
L'Artiste cède au Producteur, à titre exclusif, ses droits voisins sur l'enregistrement du ti
ARTICLE 2 – DROITS CÉDÉS
• Droit de reproduction (streaming, téléchargement, pressage physique)
• Droit de communication au public (radio, TV, sync)
• Droit de distribution sous toutes formes
• Droit d'adaptation/remix (avec accord préalable écrit)
ARTICLE 3 – DURÉE ET TERRITOIRE
[X] ans / durée légale, sur le territoire [France / UE / Monde].
ARTICLE 4 – RÉMUNÉRATION
[ ] Cachet forfaitaire : [XX] € à la signature
[ ] Royalties : [XX]% des recettes nettes, versées semestriellement
[ ] Avance : [XX] € récupérable sur premières recettes
ARTICLE 5 – DROITS MORAUX
L'Artiste conserve ses droits moraux. Crédité sous "[Nom de scène]".
Fait à [Ville], le [Date]
Producteur : Artiste :`},
{id:"coprod",cat:"contrats",icon:" ",titre:"Contrat de Co-production Musicale",access:"lab
resume:"Définit droits et obligations de deux producteurs qui co-financent un enregistreme
contenu:`CONTRAT DE CO-PRODUCTION MUSICALE
Entre :
PRODUCTEUR A : [Raison sociale], SIRET [XXXXXXX], représenté par [Nom]
PRODUCTEUR B : [Raison sociale], SIRET [XXXXXXX], représenté par [Nom]
ARTICLE 1 – OBJET
Co-production de l'enregistrement "[Titre]" interprété par [Artiste].
ARTICLE 2 – APPORTS
Producteur A : [Budget XX€ / Studios / Promotion]
Producteur B : [Budget XX€ / Distribution / Marketing]
ARTICLE 3 – RÉPARTITION
Droits de producteur phonographique :
• Producteur A : [XX]%
• Producteur B : [XX]%
Applicable à toutes les recettes d'exploitation.
ARTICLE 4 – EXPLOITATION
Décisions conjointes. En cas de désaccord : voix prépondérante du Producteur A.
ARTICLE 5 – REVERSEMENTS
Compte de gestion tenu par [A/B]. Reversements trimestriels après déduction des frais justifi
Fait à [Ville], le [Date]
Producteur A : Producteur B :`},
{id:"licence_excl",cat:"contrats",icon:" ",titre:"Contrat de Licence Exclusive",access:"la
resume:"Accorde à un tiers le droit exclusif d'exploiter un enregistrement sur un territoi
contenu:`CONTRAT DE LICENCE EXCLUSIVE
Entre :
LE CONCÉDANT : [Nom], titulaire des droits
LE LICENCIÉ : [Nom / Raison sociale]
ARTICLE 1 – EXCLUSIVITÉ ET TERRITOIRE
Licence exclusive sur : [France / Europe / Monde]
Durée : [X] ans. Le Concédant s'interdit tout droit similaire à un tiers sur ce territoire.
ARTICLE 2 – DROITS ACCORDÉS
• Streaming et téléchargement
• Diffusion radio et TV
• Synchronisation (accord écrit préalable requis)
• Distribution physique
ARTICLE 3 – RÉMUNÉRATION
Avance non récupérable : [XX] €
Royalties : [XX]% des recettes nettes, semestriellement avec relevé détaillé.
ARTICLE 4 – FIN
À l'expiration, tous droits retournent au Concédant. Stocks physiques écoulables sous 6 mois.
Fait à [Ville], le [Date]
Concédant : Licencié :`},
{id:"licence_ne",cat:"contrats",icon:" ",titre:"Contrat de Licence Non-Exclusive",access:"
resume:"Autorise plusieurs licenciés à exploiter simultanément le même enregistrement.",
contenu:`CONTRAT DE LICENCE NON-EXCLUSIVE
Entre :
LE CONCÉDANT : [Nom], titulaire des droits
LE LICENCIÉ : [Nom / Raison sociale]
ARTICLE 1 – NON-EXCLUSIVITÉ
Le Concédant peut concéder des licences similaires à d'autres tiers simultanément.
ARTICLE 2 – DROITS ET TERRITOIRE
Droits : [Streaming / Téléchargement / Sync / Radio — préciser]
Territoire : [France / Europe / Monde]
Durée : [X] ans
ARTICLE 3 – RÉMUNÉRATION
[ ] Redevance forfaitaire : [XX] €
[ ] Royalties : [XX]% des recettes nettes
ARTICLE 4 – CRÉDITS
"[Titre] — © [Année] [Nom Concédant]"
Fait à [Ville], le [Date]
Concédant : Licencié :`},
{id:"management",cat:"contrats",icon:" ",titre:"Contrat de Management Artiste",access:"lab
resume:"Définit la mission et la rémunération du manager qui développe la carrière d'un ar
contenu:`CONTRAT DE MANAGEMENT ARTISTE
Entre :
L'ARTISTE : [Nom / Scène]
LE MANAGER : [Nom / Raison sociale], SIRET [XXXXXXX]
ARTICLE 1 – MISSION
• Conseil stratégique et orientation de carrière
• Négociation et suivi des contrats (disque, booking, partenariats)
• Coordination des équipes (label, agent, attaché de presse)
• Développement des partenariats et opportunités
ARTICLE 2 – EXCLUSIVITÉ
Contrat exclusif. L'Artiste s'interdit tout autre manager pendant la durée.
ARTICLE 3 – DURÉE
[X] an(s), renouvelable par accord exprès.
ARTICLE 4 – COMMISSION
[15-20]% sur : cachets concerts, avances & royalties disque, sync, revenus publicitaires.
Exclus : remboursements frais techniques, aides publiques (CNM, ADAMI).
ARTICLE 5 – RÉSILIATION
Préavis [3] mois. Résiliation anticipée par l'Artiste : le Manager conserve ses commissions s
Fait à [Ville], le [Date]
L'Artiste : Le Manager :`},
{id:"booking_contrat",cat:"contrats",icon:" ",titre:"Contrat de Cession de Spectacle",acce
resume:"Encadre la relation producteur / salle pour un concert — cachet, conditions techni
contenu:`CONTRAT DE CESSION DE SPECTACLE
Entre :
LE PRODUCTEUR : [Nom], licence entrepreneur de spectacle n° [XXXXXX]
L'ACHETEUR : [Salle / Association], SIRET [XXXXXXX]
ARTICLE 1 – SPECTACLE
Date : [Jour, Date] — Heure : [HH:MM]
Lieu : [Salle, Adresse]
Durée : [XX minutes]
ARTICLE 2 – RÉMUNÉRATION
[ ] Cachet fixe : [XXXX] € HT
[ ] Minimum garanti [XXXX] € + [XX]% recettes nettes billetterie au-delà de [XXXX] €
Paiement : [50]% à la signature, [50]% le soir de la représentation.
ARTICLE 3 – CONDITIONS TECHNIQUES
L'Acheteur fournit les équipements de la fiche technique annexée.
Hébergement et restauration de [X] personnes pris en charge.
ARTICLE 4 – DROITS SACEM/SPRE
L'Acheteur s'acquitte directement de tous droits SACEM, SPRE et taxes.
ARTICLE 5 – ANNULATION
Par l'Acheteur à moins de 30 jours : [XX]% du cachet dû.
Par le Producteur (hors force majeure) : remboursement intégral des acomptes.
Fait à [Ville], le [Date]
Producteur : Acheteur :`},
// ── SACEM & DROITS ──
{id:"decla_sacem",cat:"sacem",icon:" ",titre:"Fiche déclaration d'œuvre SACEM",access:"all
resume:"Tout ce qu'il faut renseigner pour déclarer correctement une œuvre à la SACEM avan
contenu:`FICHE DÉCLARATION D'ŒUVRE SACEM
À déposer AVANT toute diffusion ou distribution.
━━━ INFOS SUR L'ŒUVRE ━━━
Titre exact : ________________________________
Durée (mm:ss) : ______________
Type : [ ] Originale [ ] Arrangement [ ] Adaptation
Genre : ________________________________
ISRC (si dispo) : ________________________________
━━━ AUTEURS & COMPOSITEURS ━━━
Pour chaque contributeur :
→ Nom civil complet
→ Pseudonyme
→ N° sociétaire SACEM
→ Rôle : Compositeur / Auteur / Auteur-Compositeur / Arrangeur
→ Part composition (%) | Part texte (%)
Exemple :
DUPONT Marie | SAYA | N°123456 | Auteur-Compositeur | 50% | 100%
TOTAL COMPOSITION : 100%
TOTAL TEXTE : 100%
━━━ ÉDITEUR (si applicable) ━━━
Raison sociale : ________________
N° SACEM : ________________
Part : _______%
━━━ CHECKLIST ━━━
[ ] Membre SACEM (ou démarche simultanée)
[ ] Split sheet signé par tous les co-auteurs
[ ] Parts = 100% en compo ET en texte
[ ] Dépôt AVANT mise en ligne
[ ] ISRC noté si titre déjà distribué
Dépôt via espaceclient.sacem.fr > Mes œuvres > Déclarer une œuvre`},
{id:"isrc",cat:"sacem",icon:" ",titre:"Guide obtention code ISRC",access:"all",
resume:"L'ISRC identifie chaque enregistrement de façon unique. Obligatoire pour le contenu:`GUIDE OBTENTION CODE ISRC
stream
Format : [Pays][Propriétaire][Année][ID] — ex: FR-Z03-25-00001
Pourquoi c'est indispensable :
✓ Distribution Spotify, Apple Music, Deezer...
✓ Perception droits voisins (SCPP / SPPF)
✓ Suivi diffusions radio et TV
✓ Identification bases internationales
━━━ 3 FAÇONS D'OBTENIR UN ISRC ━━━
1. Via ton distributeur (le plus simple)
DistroKid, TuneCore, Believe, CD Baby attribuent automatiquement. GRATUIT.
→ Récupère-le dans ton dashboard après soumission.
2. Via la SCPP (si tu es producteur avec SIRET)
Préfixe propre à ton label.
→ scpp.fr > Espace membres > Codes ISRC
→ Gratuit pour les membres
3. Via la SPPF
→ sppf.com | Réservé aux membres
━━━ BONNES PRATIQUES ━━━
→ 1 ISRC = 1 enregistrement unique
→ Remix ou live = nouvel ISRC
→ Ne jamais réutiliser un ISRC
→ Tiens un fichier : artiste / titre / ISRC / date
→ Déclare l'ISRC dans ta fiche SACEM
Utilise DistroKid : il attribue l'ISRC auto et tu le récupères avant la mise en ligne.`},
{id:"guide_sacem",cat:"sacem",icon:" ",titre:"Guide adhésion SACEM pas à pas",access:"all"
resume:"Comment devenir membre SACEM et commencer à percevoir tes droits d'auteur.",
contenu:`GUIDE ADHÉSION SACEM
━━━ PRÉREQUIS ━━━
→ Avoir composé ou écrit au moins 2 titres
→ Ces titres doivent être diffusés ou diffusables
━━━ ÉTAPES ━━━
1. Crée ton compte sur espaceclient.sacem.fr
→ Rubrique "Rejoindre la SACEM"
2. Remplis le dossier d'adhésion
→ Identité civile complète
→ Nom de scène (si différent)
→ Coordonnées bancaires (IBAN)
3. Déclare tes 2 premières œuvres
→ Titre exact, durée, co-auteurs et leurs parts
→ ISRC si disponible
4. Règle les frais d'adhésion
→ ~50€ remboursés dès les premiers droits perçus
5. Validation par le comité
→ Délai : 2 à 4 semaines
━━━ APRÈS L'ADHÉSION ━━━
→ Déclare chaque nouvelle œuvre AVANT sa diffusion
→ Droits versés 2x/an (printemps + automne)
→ Accès à des aides : Bourse Création, aide numérique, résidences
Plus tu déclares tôt, plus tu perçois. La SACEM perçoit sur toutes les diffusions — radio,
// ── DISTRIBUTION & PROMOTION ──
{id:"presskit",cat:"distrib",icon:" ",titre:"Template Press Kit Complet",access:"all",
resume:"Structure complète pour rédiger un press kit pro : bio courte, bio longue, élément
contenu:`TEMPLATE PRESS KIT — [NOM D'ARTISTE]
━━━ BIO COURTE (~100 mots — réseaux, playlists, booking) ━━━
[NOM] est un(e) artiste [genre] basé(e) à [ville]. Avec [X] titres en [période], il/elle s'im
━━━ BIO LONGUE (~300 mots — presse, financements) ━━━
ORIGINES & INFLUENCES
[Ville d'origine, comment la musique est arrivée, 2-3 influences avec anecdote personnelle]
TRAJECTOIRE
[Premiers pas, première sortie, évolution du son, moments clés]
PROJET ACTUEL
[EP/Album/Tournée — concept, différenciation, ambitions]
CHIFFRES CLÉS
• [X]K streams cumulés
• [X] dates en [année]
• Diffusé sur [radio/playlist Spotify]
• [Autre accomplissement]
━━━ ÉLÉMENTS VISUELS ━━━
Photos HD : [Lien Dropbox/Drive]
Format : JPG, 300 DPI min, 3000px côté court
Légende : [Nom artiste] — Photo © [Photographe] — [Année]
Logo : [Lien] | Couleurs : [Hex] | Typo : [Police]
━━━ LIENS ━━━
Spotify : [URL] | Instagram : [URL]
Smart Link : [URL] | EPK en ligne : [URL]
━━━ REVUE DE PRESSE ━━━
"[Citation courte]" — [Source], [Date]`},
{id:"checklist",cat:"distrib",icon:" ",titre:"Checklist Sortie J-60 à J+30",access:"all",
resume:"Planning complet pour préparer et maximiser une sortie musicale.",
contenu:`CHECKLIST SORTIE MUSICALE
━━━ J-60 : FONDATIONS ━━━
[ ] Master finalisé (-14 LUFS intégrés)
[ ] Artwork 3000x3000px validé (JPG/PNG, RVB)
[ ] ISRC attribué
[ ] Œuvre déposée SACEM
[ ] Split sheet signé
[ ] Contrat featuring signé (si applicable)
[ ] Budget promo défini
━━━ J-45 : DISTRIBUTION ━━━
[ ] Titre soumis au distributeur
[ ] Metadata complètes (titre, artiste, genre, copyright, ISRC)
[ ] Date de sortie confirmée
[ ] Pitch éditorial Spotify envoyé (Spotify for Artists > Pitcher un titre)
[ ] Smart link créé (Linktree, Linkfire, Beacons)
━━━ J-30 : PROMOTION ━━━
[ ] Press kit mis à jour et envoyé
[ ] Blogs musicaux contactés (15-20 contacts)
[ ] Playlists indépendantes démarchées (Groover ou direct)
[ ] Radios ciblées contactées
[ ] Contenu TikTok/Reels prêt (3-5 vidéos)
[ ] Teaser visuel monté
━━━ J-7 : DERNIÈRE LIGNE ━━━
[ ] Pré-saves activés
[ ] Relance presse + playlists avec smart link
[ ] Plan de posts semaine 1 validé
[ ] Communauté prévenue (newsletter, story)
━━━ J-0 : SORTIE ━━━
[ ] Post sur tous les réseaux
[ ] Story Instagram avec lien
[ ] TikTok/Reels publié
[ ] Partage communautés musicales
━━━ J+7 À J+30 : AFTER ━━━
[ ] J+3 : Relance presse
[ ] J+7 : Bilan streaming (Spotify for Artists)
[ ] J+14 : Relance playlists avec stats
[ ] J+30 : Bilan global
[ ] Planifier prochaine sortie`},
{id:"pitch_spotify",cat:"distrib",icon:" ",titre:"Template Pitch Éditorial Spotify",access
resume:"Comment remplir le pitch Spotify for Artists pour maximiser tes chances de playlis
contenu:`TEMPLATE PITCH ÉDITORIAL SPOTIFY
Disponible via Spotify for Artists, minimum 7 semaines avant sortie. Une seule chance par
━━━ CHAMPS À REMPLIR ━━━
GENRE PRINCIPAL : [Afro Pop / R&B / Rap FR...]
SOUS-GENRE : [Afrobeats / Soul / Trap...]
CULTURE : [Francophone / Afrodiaspora...]
MOOD : [Festif / Mélancolique / Motivant...]
STYLE : [Dansant / Intimiste / Énergique...]
INSTRUMENT CLEF : [808 / Guitare / Piano / Voix...]
━━━ DESCRIPTION (500 caractères max) ━━━
Structure conseillée :
"[Nom artiste] revient avec [Titre], un titre [adjectif] qui [concept en 1 phrase]. Produit p
━━━ CONSEILS CLÉS ━━━
→ Précis sur le mood et contexte d'écoute
→ Cite des références si pertinent ("dans la veine de...")
→ Mentionne l'actu (tournée, clip, collab connue)
→ Pas de superlatifs vides ("banger absolu"...)
→ Pitch en anglais si tu vises l'international
→ Rappelle les stats si elles sont solides`},
{id:"email_booking_tpl",cat:"distrib",icon:" ",titre:"Template Email Démarchage Salle",acc
resume:"Structure d'un email de booking efficace pour démarcher une salle ou un festival."
contenu:`TEMPLATE EMAIL BOOKING
Objet : [NOM ARTISTE] – Demande de date – [Genre] – [Ville/Région]
---
Bonjour [Prénom programmateur si connu],
Je me permets de vous contacter au sujet d'une possible date à [Nom de la salle].
Je m'appelle [Nom d'artiste], artiste [genre] basé(e) à [ville]. Mon dernier projet "[Titre]"
Votre programmation m'attire particulièrement car [raison précise liée à la salle — ne pas gé
Mon EPK complet : [LIEN — jamais de pièce jointe]
Je serais ravi(e) d'échanger sur une possible collaboration. Disponible pour la période [mois
Bien cordialement,
[Nom d'artiste]
[Email] | [Tel] | [Lien Spotify]
---
CONSEILS :
→ Envoie le mardi ou mercredi matin
→ Relance après 3 semaines sans réponse
→ Personnalise CHAQUE email — les programmateurs le voient
→ Le lien EPK en premier, jamais de pièce jointe`},
// ── FINANCEMENTS ──
{id:"fiche_cnm",cat:"finance",icon:" ",titre:"Fiche Aides CNM",access:"all",
resume:"Centre National de la Musique — les principales aides disponibles pour artistes in
contenu:`FICHE AIDES CNM — Centre National de la Musique
Site : cnm.fr/aides
━━━ PRODUCTION PHONOGRAPHIQUE ━━━
Montant : jusqu'à 50 000 €
Pour : production album/EP
Eligible : producteurs indépendants avec SIRET
Délai dossier : 4-6 mois
Étapes : compte CNM + dossier artistique + dépôt avant date limite trimestrielle
━━━ AIDE AU CLIP VIDÉO ━━━
Montant : jusqu'à 15 000 €
Pour : réalisation de clips
Eligible : artistes et labels indépendants
Délai : 2-3 mois
Étapes : compte CNM + devis réalisateur + dépôt dossier
━━━ AIDE AUX TOURNÉES ━━━
Montant : variable
Pour : tournées nationales
Eligible : intermittents, associations
Délai : 3-4 mois
Étapes : planning confirmé + contrats de cession + dossier CNM
━━━ AIDE AU DÉVELOPPEMENT EXPORT ━━━
Pour : artistes visant les marchés internationaux
Contact : Bureau Export (french-music.org)
━━━ COMMENT POSTULER ━━━
1. Crée ton compte sur cnm.fr
2. Vérifie ton éligibilité (statut, type de projet)
3. Prépare : dossier artistique, devis, planning, CV artistique
4. Dépose avant la date limite trimestrielle (publiée sur le site)
Les aides CNM sont cumulables avec SACEM, ADAMI, DRAC.`},
{id:"fiche_adami",cat:"finance",icon:" ",titre:"Fiche ADAMI / SPEDIDAM",access:"all",
resume:"Aides pour artistes-interprètes : ADAMI (solistes) et SPEDIDAM (musiciens).",
contenu:`FICHE ADAMI & SPEDIDAM
━━━ ADAMI (artistes-interprètes solistes) ━━━
Site : adami.fr/artiste/aides-et-bourses
Montant : 1 000 – 15 000 €
Pour : album, tournée, clip
Eligible : artistes-interprètes (chanteurs, comédiens...)
Délai : 2-4 mois
Aides disponibles :
• Bourse Démo : financer un enregistrement démo
• Aide à la production : album ou EP
• Aide au spectacle vivant : soutien à la création scénique
• Aide à la mobilité : frais de déplacement international
Étapes : être artiste-interprète + dossier projet + soumission en ligne
━━━ SPEDIDAM (musiciens interprètes) ━━━
Site : spedidam.fr/aides
Montant : 500 – 8 000 €
Pour : album, studio, tournée
Eligible : musiciens interprètes (instrumentistes...)
Délai : 2-3 mois
Aides disponibles :
• Aide à l'enregistrement
• Aide à la diffusion live
• Aide à la formation
Étapes : être musicien interprète + dossier artistique + dépôt en ligne
ADAMI et SPEDIDAM sont complémentaires — tu peux postuler aux deux si tu es à la fois chan
{id:"fiche_drac",cat:"finance",icon:" ",titre:"Fiche Résidences & DRAC",access:"all",
resume:"Financements régionaux DRAC et résidences artistiques — studio gratuit et accompag
contenu:`FICHE DRAC & RÉSIDENCES ARTISTIQUES
━━━ DRAC — Directions Régionales des Affaires Culturelles ━━━
Site : culture.gouv.fr/Regions
Montant : 1 000 – 20 000 €
Pour : projets culturels ancrés régionalement
Eligible : associations, intermittents avec ancrage territorial
Délai : 3-5 mois
Comment postuler :
1. Contacte ta DRAC régionale (trouvable sur le site)
2. Présente ton projet avec ancrage local fort
3. Dossier artistique complet + budget prévisionnel
4. Réponse sous 3-5 mois
━━━ RÉSIDENCES ARTISTIQUES ━━━
Site de référence : irma.asso.fr
Montant : Studio gratuit + cachet 500-3 000 €
Pour : création et développement artistique
Eligible : tous statuts
Appels : annuels (veille régulière nécessaire)
Types de résidences :
• Résidences de création : studio + temps pour créer
• Résidences de diffusion : accompagnement de la tournée
• Résidences pédagogiques : transmission + création
Comment postuler :
1. Veille sur irma.asso.fr et les scènes nationales
2. Dossier artistique + démo + lettre de motivation personnalisée
3. Délai de réponse : 1-3 mois
Les résidences offrent souvent hébergement + repas en plus du studio. Très précieux pour l
{id:"tpl_dossier",cat:"finance",icon:" ",titre:"Template Dossier Subvention",access:"all",
resume:"Structure type d'un dossier de demande de subvention pour CNM, DRAC, SACEM.",
contenu:`TEMPLATE DOSSIER SUBVENTION
━━━ PAGE DE GARDE ━━━
Nom du porteur de projet : [Nom / Raison sociale]
SIRET (si applicable) : [XXXXXXXXXXXXXXX]
Contact : [Email] | [Tel]
Nom du projet : [Titre du projet]
Type de demande : [Production / Clip / Tournée / Résidence]
Montant demandé : [XXXX] €
Date de dépôt : [Date]
━━━ 1. PRÉSENTATION ARTISTIQUE ━━━
Biographie courte de l'artiste (150 mots max)
Discographie / Historique de dates
Éléments de presse (si disponibles)
Liens : Spotify, site, EPK
━━━ 2. DESCRIPTION DU PROJET ━━━
Contexte : pourquoi ce projet, pourquoi maintenant
Objectifs artistiques : ce que le projet va produire
Objectifs de diffusion : public visé, territoire
Calendrier prévisionnel : étape par étape
━━━ 3. BUDGET PRÉVISIONNEL ━━━
DÉPENSES
• Studio / Production : [XX] €
• Promotion / Vidéo : [XX] €
• Logistique / Transport : [XX] €
• Autres frais : [XX] €
TOTAL DÉPENSES : [XX] €
RECETTES
• Autofinancement : [XX] €
• Autres subventions demandées : [XX] €
• Subvention [Organisme] demandée : [XX] €
TOTAL RECETTES : [XX] €
━━━ 4. ANNEXES ━━━
[ ] Devis studio / prestataires
[ ] Contrats signés (cession, booking)
[ ] Extrait Kbis ou attestation URSSAF
[ ] Relevé SACEM ou attestation adhésion
Sois précis sur les chiffres. Les comités vérifient la cohérence budget/projet.`},
// ── STATUTS ──
{id:"guide_ae",cat:"statuts",icon:" ",titre:"Guide Auto-Entrepreneur Artiste",access:"all"
resume:"Tout pour créer ton statut auto-entrepreneur et facturer ton activité musicale lég
contenu:`GUIDE AUTO-ENTREPRENEUR ARTISTE
Site : autoentrepreneur.urssaf.fr
Délai création : 48-72h | Gratuit
━━━ POURQUOI CE STATUT ? ━━━
→ Simple à créer, pas de comptable obligatoire
→ Permet de facturer (concerts, cours, sessions studio)
→ Protection sociale dès le premier euro déclaré
→ Idéal pour démarrer avant de créer une société
━━━ CODES APE POUR ARTISTES ━━━
• 9001Z : Arts du spectacle vivant (concerts, live)
• 5920Z : Enregistrement sonore et édition musicale (studio, production)
Tu peux avoir les deux activités sous un même statut.
━━━ ÉTAPES DE CRÉATION ━━━
1. Va sur autoentrepreneur.urssaf.fr
2. Clique "Créer mon auto-entreprise"
3. Remplis : identité, activité (code APE), adresse
4. Reçois ton SIRET sous 48-72h par email
5. Commence à facturer !
━━━ DÉCLARATIONS & COTISATIONS ━━━
→ Déclare ton chiffre d'affaires mensuellement ou trimestriellement
→ Taux de cotisation : ~22% du CA pour les services
→ Si CA = 0 → cotisations = 0
━━━ LIMITES DU STATUT ━━━
→ Plafond CA : 77 700€/an (au-delà → autre statut)
→ Pas de TVA récupérable en dessous du seuil
→ Droits chômage limités (sauf si tu es aussi salarié)
Cumul possible avec l'intermittence si tu es éligible.`},
{id:"guide_intermittent",cat:"statuts",icon:" ",titre:"Guide Intermittent du Spectacle",ac
resume:"Comment accéder au statut d'intermittent, conditions, droits et pièges à éviter.",
contenu:`GUIDE INTERMITTENT DU SPECTACLE
━━━ C'EST QUOI ? ━━━
Régime d'assurance chômage spécifique pour les artistes et techniciens du spectacle, permetta
━━━ CONDITIONS D'ACCÈS ━━━
→ 507 heures de travail salarié dans le spectacle en 12 mois (artiste)
→ Contrats en CDD d'usage (CDDU) obligatoires
→ Employeurs déclarant à Pôle Emploi Spectacle
━━━ DROITS ━━━
→ Allocations journalières entre les contrats
→ Mutuelle pro (CMB — Caisse des Médias)
→ Accès formation (AFDAS)
→ Droits retraite spécifiques
━━━ DOCUMENTS NÉCESSAIRES ━━━
[ ] Bulletins de salaire (justifiant les 507h)
[ ] Attestations employeurs
[ ] Fiche d'état civil
[ ] RIB
━━━ PIÈGES À ÉVITER ━━━
→ Ne pas confondre auto-entrepreneur et intermittent (incompatibles sur la même activité)
→ Les cachets en association peuvent valider des heures
→ Attention aux "faux cachets" — risque de redressement
→ Renouveler ses droits avant la date d'anniversary
━━━ RESSOURCES ━━━
→ Pôle Emploi Spectacle : pole-emploi.fr
→ Fédération des employeurs : fe-sps.fr
→ CMB Mutuelle : cmb-sante.fr
Tu peux cumuler auto-entrepreneur ET intermittent si les activités sont bien séparées. Con
{id:"guide_label",cat:"statuts",icon:" ",titre:"Guide Création Label Indépendant",access:"
resume:"Créer une structure pour produire et distribuer ta musique professionnellement.",
contenu:`GUIDE CRÉATION LABEL INDÉPENDANT
━━━ POURQUOI CRÉER UN LABEL ? ━━━
→ Être propriétaire de tes masters (droits producteur)
→ Obtenir un préfixe ISRC propre
→ Signer d'autres artistes
→ Accéder aux aides CNM réservées aux producteurs
→ Crédibilité professionnelle
━━━ ÉTAPE 1 : CHOISIR SON STATUT JURIDIQUE ━━━
• Auto-entrepreneur : gratuit, rapide, mais limité (pas de TVA, plafond CA)
• SASU / SAS : ~1500€ avec accompagnement, TVA récupérable, associés possibles
• SARL : similaire, more adapté si plusieurs associés dès le départ
→ Recommandation pour débuter : SASU
━━━ ÉTAPE 2 : DÉPOSER LA MARQUE (INPI) ━━━
Site : inpi.fr
Coût : 290€ pour 10 ans et 1 classe
Délai : 3-6 mois pour l'enregistrement définitif
Dépose AVANT d'en parler publiquement
━━━ ÉTAPE 3 : CRÉER LA SOCIÉTÉ ━━━
1. Rédiger les statuts (notaire ou en ligne via Legalstart)
2. Déposer le capital (1€ minimum pour SAS)
3. Publier une annonce légale (~150€)
4. Déposer au greffe du tribunal de commerce
5. Recevoir le Kbis
━━━ ÉTAPE 4 : ADHÉRER À LA SCPP ━━━
→ Pour obtenir ton préfixe ISRC de label
→ Pour percevoir les droits voisins producteur
→ Site : scpp.fr
━━━ ÉTAPE 5 : OUVRIR UN COMPTE PRO ━━━
→ Compte bancaire dédié obligatoire
→ Options : Shine, Qonto, N26 Business (moins chers que les banques traditionnelles)
Budget total pour créer une SAS proprement : 2 000-3 000€ avec accompagnement.`},
// ── LIVE & TECHNIQUE ──
{id:"rider",cat:"live",icon:" ",titre:"Template Rider Technique",access:"label",
resume:"Document technique à fournir aux salles : matériel requis, implantation scène, bes
contenu:`RIDER TECHNIQUE — [NOM D'ARTISTE / GROUPE]
Contact technique : [Nom] | [Email] | [Tel]
Mise à jour : [Date]
━━━ CONFIGURATION SCÈNE ━━━
Formation : [Solo / Duo / Trio / Groupe X personnes]
Durée du set : [XX minutes]
━━━ BESOINS SON ━━━
SYSTÈME : Console numérique de préférence (Yamaha CL / Allen & Heath Avantis / Midas M32)
MICROPHONES :
• 1x micro chant (Shure SM58 ou equivalent)
• [X]x micros instruments (préciser)
DI BOXES : [X]x DI passives
IN-EAR / RETOURS : [préciser préférence]
LISTE DE CANAUX CONSOLE :
1. Chant principal — Shure SM58
2. Chant BV — [si applicable]
3. Guitare — DI ou ampli micro
4. Basse — DI
5. Kick
6. Caisse claire
7. Overhead
8. Clavier — DI stéréo
[Adapter selon formation]
━━━ BESOINS LUMIÈRE ━━━
• Éclairage général de scène suffisant
• [Effets spécifiques si applicable]
• Contact lumière : [Oui/Non — rider lumière disponible sur demande]
━━━ BACKLINE ━━━
Fourni par l'artiste : [liste]
Demandé à la salle : [liste — ampli guitare, batterie...]
━━━ LOGES & ACCUEIL ━━━
Nombre de personnes : [X]
Riders hospitality : [eau, repas chaud, boissons — à négocier]
━━━ SOUNDCHECK ━━━
Durée souhaitée : [X] minutes
Heure souhaitée : [X]h avant le concert
Merci de confirmer réception et disponibilité du matériel.
[Nom] | [Contact]`},
{id:"fiche_tech",cat:"live",icon:" ",titre:"Template Fiche Technique Salle",access:"label"
resume:"Fiche à remplir pour chaque salle contactée : capacité, équipement, contacts.",
contenu:`TEMPLATE FICHE TECHNIQUE SALLE
━━━ INFORMATIONS GÉNÉRALES ━━━
Nom de la salle : ________________________________
Adresse : ________________________________
Ville : ________________________________
Capacité (jauge) : _______ personnes
Type : [ ] SMAC [ ] Club [ ] Salle privée [ ] Festival
━━━ CONTACTS ━━━
Directeur / Directrice : ________________________________
Programmateur(trice) : ________________________________
Email programmation : ________________________________
Téléphone : ________________________________
Site web : ________________________________
━━━ ÉQUIPEMENT TECHNIQUE ━━━
Console son : ________________________________
Système de diffusion : ________________________________
Nombre de retours scène : ________
In-ear monitoring disponible : [ ] Oui [ ] Non
Console lumières : ________________________________
Backline disponible : [ ] Batterie [ ] Ampli guitare [ ] Ampli basse [ ] Autre
━━━ DIMENSIONS SCÈNE ━━━
Largeur : _______ m | Profondeur : _______ m | Hauteur : _______ m
━━━ CONDITIONS BOOKING ━━━
Cachet minimum : _______ € | Cachet maximum : _______ €
Type de contrat habituel : [ ] Cession [ ] Coréalisation [ ] Résidence
Délai de réponse habituel : _______
Meilleure période pour postuler : _______
━━━ NOTES ━━━
[Spécificités, conseils, historique de la relation avec la salle]`},
];
// --- LIENS ANNUAIRES EXTERNES -----------------------------------------------
const ANNUAIRES_EXT = [
{id:"distrokid", label:"DistroKid", icon:" ", cat:"Distribution", desc:"Distribut
{id:"tunecore", label:"TuneCore", icon:" ", cat:"Distribution", desc:"Distribu
{id:"groover", label:"Groover", icon:" ", cat:"Promotion", desc:"Pitcher
{id:"spotify_art", label:"Spotify for Artists",icon:" ", cat:"Promotion", desc:"Stats,
{id:"bandsintown", label:"Bandsintown", icon:" ", cat:"Booking", desc:"Annonce
{id:"sacem_site", label:"SACEM", icon:" ", cat:"Droits", desc:"Déposer
{id:"scpp_site", label:"SCPP — ISRC", icon:" ", cat:"Droits", desc:"Obtenir
{id:"cnm_site", label:"CNM", icon:" ", cat:"Financement", desc:"Aides à
{id:"adami_site", label:"ADAMI", icon:" ", cat:"Financement", desc:"Aides p
{id:"spedidam_site",label:"SPEDIDAM", icon:" ", cat:"Financement", desc:"Aides p
{id:"irma_site", label:"IRMA", icon:" ", cat:"Financement", desc:"Résiden
{id:"kkbb_site", label:"KissKissBankBank", icon:" ", cat:"Financement", desc:"Crowdfu
{id:"inpi_site", label:"INPI", icon:" ", cat:"Juridique", desc:"Déposer
{id:"urssaf_ae", label:"URSSAF Auto-Entrepreneur",icon:" ",cat:"Juridique", desc:"Créer
{id:"ifcic_site", label:"IFCIC", icon:" ", cat:"Financement", desc:"Garanti
];
// --- RÉSEAU DATA --------------------------------------------------------------
const ANNONCES_INIT = [
{id:1,type:"cherche",role:"Chanteuse",genre:"R&B / Soul",ville:"Paris",nom:"Melodia S.",ava
{id:2,type:"propose",role:"Beatmaker",genre:"Afrobeats / Trap",ville:"Lyon",nom:"BeatsByKin
{id:3,type:"cherche",role:"Guitariste",genre:"Pop / Folk",ville:"Marseille",nom:"Emma B.",a
{id:4,type:"propose",role:"Studio d'enregistrement",genre:"Tous genres",ville:"Paris 10e",n
{id:5,type:"cherche",role:"Ingénieur du son",genre:"Hip-Hop / Afro",ville:"Bordeaux",nom:"L
{id:6,type:"propose",role:"Label indépendant",genre:"Tous genres",ville:"Paris",nom:"Wake U
];
// --- HELPERS -----------------------------------------------------------------
const gp = p => Math.round(Object.values(p).reduce((a,b)=>a+b,0)/Object.values(p).length);
const daysUntil = d => { if(!d) return null; return Math.ceil((new Date(d)-new Date())/864000
const COLORS = ["#FF6B35","#00C9A7","#845EF7","#FFD43B","#F03E3E","#20C997","#74C0FC","#F783A
const AI_SYSTEM = "Tu es un expert musical dans la scène indépendante française. Rédige des t
// --- STYLES ------------------------------------------------------------------
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family
*{box-sizing:border-box;margin:0;padding:0}
::-webkit-scrollbar{width:3px;height:3px}
::-webkit-scrollbar-thumb{background:#1A1A1A;border-radius:2px}
input,textarea,select{width:100%;background:#111;border:1px solid #1E1E1E;color:#F0EDE8;fon
input:focus,textarea:focus{border-color:#FF6B3555}
input::placeholder,textarea::placeholder{color:#555}
input[type=date]{color-scheme:dark}
textarea{resize:none}
@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translate
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes pulse{0%,100%{opacity:0.3}50%{opacity:1}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
@keyframes glow{0%,100%{box-shadow:0 0 20px #FF6B3515}50%{box-shadow:0 0 35px #FF6B3530}}
@keyframes spin{to{transform:rotate(360deg)}}
.fu{animation:fadeUp 0.3s ease forwards}
.fi{animation:fadeIn 0.25s ease forwards}
.btn{background:linear-gradient(135deg,#FF6B35 0%,#FF8550 100%);border:none;color:#000;font
.btn:hover{transform:translateY(-1px);box-shadow:0 6px 20px #FF6B3555}
.btn:disabled{background:#1A1A1A;color:#333;box-shadow:none;transform:none;cursor:not-allow
.btn-o{background:none;border:1px solid #1E1E1E;color:#555;font-family:'Inter',sans-serif;f
.btn-o:hover{border-color:#333;color:#888}
.pill{font-size:9px;letter-spacing:1px;padding:2px 8px;border-radius:20px;display:inline-fl
.chip{display:inline-flex;font-size:9px;color:#555;background:#111;padding:2px 8px;border-r
.card{background:linear-gradient(180deg,#0F0F0F 0%,#0B0B0B 100%);border-radius:12px;border:
.card:hover{border-color:#2A2A2A;box-shadow:0 4px 16px rgba(0,0,0,0.5)}
.panel{position:fixed;inset:0;background:#000000EE;z-index:200;display:flex;flex-direction:
.pin{background:#080808;flex:1;overflow-y:auto;animation:fadeUp 0.25s ease;border-top:2px s
.tab{flex:1;background:none;border:none;border-bottom:2px solid transparent;color:#444;font
.tab.on{color:#FF6B35;border-bottom-color:#FF6B35}
.nav{display:flex;flex-direction:column;align-items:center;gap:3px;padding:7px 0;cursor:poi
a.lnk{display:block;text-align:center;padding:12px;border-radius:5px;font-family:'Inter',sa
`;
stopCo
stopCo
// --- LOGO ---------------------------------------------------------------------
function Logo({size=70,anim=false}){
return(
<svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={anim?{animation:
<defs>
<linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" <linearGradient id="lg2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" </defs>
<circle cx="50" cy="50" r="46" stroke="url(#lg1)" strokeWidth="1.5" fill="none" opacity
<circle cx="50" cy="50" r="36" fill="#0D0D0D" stroke="#FF6B3322" strokeWidth="1"/>
<rect x="46" y="27" width="8" height="46" fill="url(#lg1)" rx="2"/>
<rect x="37" y="27" width="26" height="7" fill="url(#lg1)" rx="2"/>
<rect x="37" y="66" width="26" height="7" fill="url(#lg1)" rx="2"/>
<circle cx="69" cy="31" r="5" fill="#FF6B35"/><circle cx="69" cy="31" r="2.5" fill="#FF
<path d="M27 41 Q21 50 27 59" stroke="#FF6B35" strokeWidth="2.5" fill="none" strokeLine
<path d="M21 36 Q11 50 21 64" stroke="#FF6B35" strokeWidth="1.5" fill="none" strokeLine
<path d="M73 41 Q79 50 73 59" stroke="#845EF7" strokeWidth="2.5" fill="none" strokeLine
<path d="M79 36 Q89 50 79 64" stroke="#845EF7" strokeWidth="1.5" fill="none" strokeLine
</svg>
);
}
// --- HEADER -------------------------------------------------------------------
function Hdr({sub,accent="#FF6B35",right}){
return(
<div style={{padding:"16px 20px 13px",borderBottom:"1px solid #0F0F0F",display:"flex",jus
<div>
<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:24,letterSpacing:4,color:a
<div style={{fontSize:9,color:"#888",letterSpacing:2.5,marginTop:1}}>{sub}</div>
</div>
{right}
</div>
);
}
// --- LANDING ------------------------------------------------------------------
function Landing({onEnter}){
return(
<div style={{minHeight:"100vh",background:"#060606",color:"#F0EDE8",fontFamily:"'Inter',s
<div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 30% 20%
<div style={{position:"absolute",top:"15%",left:"8%",width:180,height:180,borderRadius:
<div style={{position:"absolute",bottom:"20%",right:"5%",width:150,height:150,borderRad
<div style={{padding:"20px 24px",display:"flex",justifyContent:"space-between",position
<div style={{fontSize:9,color:"#888",letterSpacing:3}}>BETA</div>
<div style={{fontSize:9,color:"#888",letterSpacing:2}}>FR · INDÉ · LIBRE</div>
</div>
<div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyCo
<Logo size={130} anim/>
<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:84,letterSpacing:20,lineHe
<div style={{fontSize:11,color:"#FF6B35",letterSpacing:7,marginBottom:26,fontWeight:6
<div style={{width:40,height:1,background:"#1F1F1F",marginBottom:22}}/>
<div style={{fontSize:28,fontFamily:"'Bebas Neue',sans-serif",letterSpacing:5,color:"
<div style={{fontSize:14,color:"#777",lineHeight:1.6,maxWidth:280,marginBottom:40,fon
<button className="btn" style={{width:"auto",padding:"18px 56px",fontSize:14,letterSp
<div style={{fontSize:11,color:"#999",marginTop:18,letterSpacing:1,fontWeight:500}}>3
<div style={{fontSize:10,color:"#777",marginTop:32,letterSpacing:2,fontWeight:400,lin
</div>
<div style={{padding:"14px 24px",textAlign:"center",fontSize:9,color:"#111",letterSpaci
</div>
);
}
// --- ONBOARDING ---------------------------------------------------------------
function Onboarding({onDone}){
const [step,setStep]=useState(0);
const [name,setName]=useState("");
const [genre,setGenre]=useState("");
const steps=[
{e:" ",t:"BIENVENUE\nCHEZ INDY",s:"Le coach de poche de l'artiste indépendant",c:null},
{e:" ",t:"TON NOM\nD'ARTISTE",s:"Comment tu t'appelles ?",c:<input value={name} onChange
{e:" ",t:"TON GENRE\nMUSICAL",s:"Afro Pop, R&B, Trap FR…",c:<input value={genre} onChang
{e:" ",t:"TOUT EST\nPRÊT",s:`Bienvenue ${name||"artiste"} — c'est parti.`,c:null},
];
const s=steps[step];
const ok=step===0||step===3||(step===1&&name.trim())||(step===2&&genre.trim());
return(
<div style={{minHeight:"100vh",background:"#080808",color:"#F0EDE8",fontFamily:"'Inter',s
<div style={{display:"flex",gap:4,padding:"20px 24px 0"}}>
{steps.map((_,i)=><div key={i} style={{flex:1,height:2,borderRadius:1,background:i<=s
</div>
<div className="fu" style={{flex:1,display:"flex",flexDirection:"column",alignItems:"ce
<div style={{fontSize:52}}>{s.e}</div>
<div style={{textAlign:"center"}}>
<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:34,letterSpacing:4,lineH
<div style={{fontSize:12,color:"#555",marginTop:10,lineHeight:1.6}}>{s.s}</div>
</div>
{s.c&&<div style={{width:"100%"}}>{s.c}</div>}
</div>
<div style={{padding:"0 24px 40px",display:"flex",flexDirection:"column",gap:10}}>
<button className="btn" disabled={!ok} onClick={()=>step<steps.length-1?setStep(step+
{step>0&&<button className="btn-o" style={{width:"100%"}} onClick={()=>setStep(step-1
</div>
</div>
);
}
// --- PAYWALL -----------------------------------------------------------------
function Paywall({onSelect,current}){
const [loading,setLoading]=useState(null);
const [showTest,setShowTest]=useState(false);
const choose=async(plan)=>{
if(plan.id==="free"){onSelect("free");return;}
setLoading(plan.id);await new Promise(r=>setTimeout(r,1600));setLoading(null);onSelect(pl
};
return(
<div style={{minHeight:"100vh",background:"#080808",color:"#F0EDE8",fontFamily:"'Inter',s
<div style={{padding:"36px 24px 24px",textAlign:"center",borderBottom:"1px solid <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 0
<Logo size={60} anim/>
#111",
<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:46,letterSpacing:8,lineHei
<div style={{fontSize:9,color:"#555",letterSpacing:3,marginTop:4,marginBottom:14}}>SO
<div style={{fontSize:12,color:"#666",lineHeight:1.7,maxWidth:280,margin:"0 auto"}}>L
</div>
<div style={{padding:"18px 18px 100px",display:"flex",flexDirection:"column",gap:12}}>
<div style={{background:"#0D0D0D",border:"1px solid #FFD43B22",borderRadius:8,padding
<span style={{fontSize:14}}> </span>
<div><div style={{fontSize:9,color:"#FFD43B",letterSpacing:2}}>MODE TEST</div><div
<button onClick={()=>setShowTest(!showTest)} style={{marginLeft:"auto",background:"
</div>
{showTest&&<div className="fi" style={{background:"#0A1A0A",border:"1px solid #00C9A7
{PLANS.map((plan,i)=>(
<div key={plan.id} className={`card fu`} style={{padding:20,animationDelay:`${i*0.0
<div style={{position:"absolute",top:0,left:0,right:0,height:2,background:plan.co
{plan.badge&&<span className="pill" style={{position:"absolute",top:12,right:14,b
{plan.id===current&&<span className="pill" style={{position:"absolute",top:12,rig
<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:3,col
<div style={{display:"flex",alignItems:"baseline",gap:2,marginBottom:6}}>
<span style={{fontSize:26,fontFamily:"'Bebas Neue',sans-serif"}}>{plan.price}</
<span style={{fontSize:11,color:"#999"}}>{plan.period}</span>
{plan.priceFutur&&<span style={{fontSize:10,color:"#888",textDecoration:"line-t
</div>
{plan.priceFutur&&<div style={{fontSize:10,color:"#555",marginBottom:10,fontWeigh
{plan.labelInfo&&<div style={{background:`${plan.color}15`,border:`1px solid ${pl
{plan.features.map((f,fi)=><div key={fi} style={{display:"flex",gap:8,fontSize:11
{plan.locked?.map((f,fi)=><div key={fi} style={{display:"flex",gap:8,fontSize:11,
<button className="btn" disabled={loading!==null||plan.id===current} style={{marg
{loading===plan.id?<span style={{display:"flex",alignItems:"center",justifyCont
</button>
</div>
))}
</div>
</div>
<div style={{fontSize:10,color:"#1A1A1A",textAlign:"center",letterSpacing:1}}>Résilia
);
}
// --- DASHBOARD ---------------------------------------------------------------
function Dashboard({projects,setProjects,goCoach,goPlan,plan,user}){
const [edit,setEdit]=useState(null);const [isNew,setIsNew]=useState(false);
const urgent=projects.filter(p=>{const d=daysUntil(p.sortie);return d!==null&&d<=14&&d>=0;}
const total=projects.length?Math.round(projects.reduce((a,p)=>a+gp(p.progress),0)/projects.
const maxP=plan==="free"?2:Infinity;
const save=(u)=>{if(isNew)setProjects(ps=>[...ps,{...u,id:Date.now(),checks:{}}]);else setP
return(
<div style={{minHeight:"100vh",background:"#080808",color:"#F0EDE8",fontFamily:"'Inter',s
<Hdr sub={user?.name?`BONJOUR ${user.name.toUpperCase()}`:"TABLEAU DE BORD"} right={<di
<div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",borderBottom:"1px solid
{[{l:"Titres",v:projects.length},{l:"En cours",v:projects.filter(p=>{const g=gp(p.pro
<div key={i} style={{padding:"11px 0",textAlign:"center",borderRight:i<3?"1px solid
<div style={{fontSize:19,fontFamily:"'Bebas Neue',sans-serif",color:s.red&&s.v>0?
<div style={{fontSize:9,color:"#555",letterSpacing:1}}>{s.l.toUpperCase()}</div>
</div>
))}
</div>
{urgent.length>0&&<div style={{margin:"14px 18px 0",background:"#0E0808",border:"1px so
<div style={{padding:"14px 18px",display:"flex",flexDirection:"column",gap:10}}>
{projects.map((p,i)=>{
const g=gp(p.progress);const d=daysUntil(p.sortie);const st=STAGES.find(s=>s.id===p
return(
<div key={p.id} className="fu" style={{animationDelay:`${i*0.04}s`,background:"#0
<div style={{position:"absolute",top:0,left:0,right:0,height:2,background:p.col
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-sta
<div><div style={{fontSize:14,fontFamily:"'Bebas Neue',sans-serif",letterSpac
<div style={{fontSize:20,fontFamily:"'Bebas Neue',sans-serif",color:g===100?"
</div>
<div style={{display:"flex",gap:4,marginBottom:6}}>{STAGES.map(s=><div key={s.i
<div style={{display:"flex",gap:2,marginBottom:10}}>{STAGES.map(s=><div key={s.
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}
<span className="pill" style={{background:`${st?.color}15`,color:st?.color}}>
{d!==null&&<span style={{fontSize:10,color:d<=7?"#F03E3E":d<=21?"#FFD43B":"#3
</div>
{p.urgent&&<div style={{marginTop:9,fontSize:10,color:"#777",background:"#0A0A0
<button onClick={e=>{e.stopPropagation();setEdit(p);setIsNew(false);}} style={{
</div>
);
})}
{projects.length<maxP?(
<button onClick={()=>{setEdit({titre:"",artiste:user?.name||"",genre:user?.genre||"
):(
<div style={{background:"#0D0D0D",border:"1px solid #FF6B3522",borderRadius:10,padd
<div style={{fontSize:11,color:"#FF6B35",marginBottom:6}}> Limite gratuite atte
<div style={{fontSize:10,color:"#999",marginBottom:12}}>Passe à INDY Artiste pour
<button className="btn" style={{width:"auto",padding:"10px 20px"}} onClick={goPla
</div>
)}
</div>
</div>
{edit&&<EditPanel project={edit} isNew={isNew} onClose={()=>{setEdit(null);setIsNew(fal
);
}
function EditPanel({project,isNew,onClose,onSave,onDelete}){
const [d,setD]=useState({...project});const u=(k,v)=>setD(p=>({...p,[k]:v}));
return(
<div className="panel"><div className="pin" style={{borderTopColor:d.color}}>
<div style={{padding:"16px 20px",borderBottom:"1px solid #111",display:"flex",justifyCo
<div><div style={{fontSize:9,color:d.color,letterSpacing:2}}>{isNew?"NOUVEAU TITRE":"
<button onClick={onClose} style={{background:"none",border:"none",color:"#999",fontSi
</div>
<div style={{padding:"18px 20px 40px",display:"flex",flexDirection:"column",gap:12,font
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
<div><label style={{fontSize:11,color:"#888",letterSpacing:1.5,display:"block",marg
<div><label style={{fontSize:11,color:"#888",letterSpacing:1.5,display:"block",marg
</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
<div><label style={{fontSize:11,color:"#888",letterSpacing:1.5,display:"block",marg
<div><label style={{fontSize:11,color:"#888",letterSpacing:1.5,display:"block",marg
</div>
<div><label style={{fontSize:11,color:"#888",letterSpacing:1.5,display:"block",margin
<div><label style={{fontSize:11,color:"#AAA",letterSpacing:1,fontWeight:600,display:"
<div><label style={{fontSize:11,color:"#AAA",letterSpacing:1,fontWeight:600,display:"
<div style={{display:"flex",flexDirection:"column",gap:9,marginTop:6}}>
<button className="btn" disabled={!d.titre} onClick={()=>onSave(d)} style={{backgro
{!isNew&&<button className="btn-o" style={{width:"100%",color:"#F03E3E44",borderCol
<button className="btn-o" style={{width:"100%"}} onClick={onClose}>Annuler</button>
</div>
</div>
</div></div>
);
}
// --- COACH --------------------------------------------------------------------
function Coach({projects,setProjects,activeId,setActiveId}){
const [si,setSi]=useState(0);const [tip,setTip]=useState(null);
const proj=projects.find(p=>p.id===activeId)||projects[0];
if(!proj)return <div style={{display:"flex",alignItems:"center",justifyContent:"center",min
const stage=STAGES[si];const tasks=TASKS[stage.id]||[];const checks=proj.checks||{};
const done=tasks.filter(t=>checks[t.id]).length;const pct=tasks.length?done/tasks.length:0;
const toggle=(tid)=>{const nc={...checks,[tid]:!checks[tid]};const np={};STAGES.forEach(s=>
return(
<div style={{minHeight:"100vh",background:"#080808",color:"#F0EDE8",fontFamily:"'Inter',s
<Hdr sub="COACH PARCOURS" right={<select value={proj.id} onChange={e=>setActiveId(Numbe
<div style={{padding:"10px 18px",borderBottom:"1px solid #111",display:"flex",alignItem
<div style={{width:8,height:8,borderRadius:"50%",background:proj.color}}/><span style
{proj.urgent&&<span className="pill" style={{background:`${proj.color}15`,color:proj.
</div>
<div style={{display:"flex",overflowX:"auto",padding:"10px 14px",gap:6,borderBottom:"1p
{STAGES.map((s,i)=>{const ts=TASKS[s.id]||[];const act=i===si;return(
<button key={s.id} onClick={()=>{setSi(i);setTip(null);}} style={{background:act?`$
<span style={{fontSize:14}}>{s.icon}</span><span>{s.label.toUpperCase()}</span>
<div style={{display:"flex",gap:2}}>{ts.map((t,ti)=><div key={ti} style={{width:4
</button>
);})}
</div>
<div style={{padding:"18px 18px 0"}}>
<div style={{marginBottom:16}}>
<div style={{display:"flex",alignItems:"baseline",gap:8,marginBottom:4}}><span styl
<div style={{height:2,background:"#111",borderRadius:1,overflow:"hidden"}}><div sty
<div style={{display:"flex",justifyContent:"space-between",marginTop:5}}><span styl
</div>
<div style={{background:"#0C0C0C",border:`1px solid ${stage.color}15`,borderRadius:7,
<div style={{fontSize:9,color:stage.color,letterSpacing:2,marginBottom:5}}>◆ COACH<
<div style={{fontSize:12,color:"#666",lineHeight:1.7}}>
{pct===0&&"Coche les éléments déjà validés pour évaluer où tu en es."}{pct>0&&pct
</div>
</div>
<div style={{background:"#0D0D0D",borderRadius:8,padding:"0 14px"}}>
{tasks.map(task=>{const chk=!!checks[task.id];const showTip=tip===task.id;return(
<div key={task.id}>
<div style={{display:"flex",alignItems:"flex-start",gap:12,padding:"13px 0",bor
<div style={{width:19,height:19,borderRadius:4,border:`1.5px solid ${chk?stag
<div style={{flex:1,fontSize:12,color:chk?"#444":"#CCC",textDecoration:chk?"l
<button onClick={e=>{e.stopPropagation();setTip(showTip?null:task.id);}} styl
</div>
{showTip&&<div style={{background:"#111",borderLeft:`2px solid ${stage.color}`,
</div>
);})}
</div>
<div style={{display:"flex",justifyContent:"space-between",marginTop:22,gap:10}}>
{si>0&&<button className="btn-o" onClick={()=>{setSi(si-1);setTip(null);}}>← {si<STAGES.length-1&&<button className="btn-o" style={{marginLeft:"auto",borderColo
</div>
</div>
</div>
Retour
);
}
// --- PRESS KIT ----------------------------------------------------------------
// --- GATE — Bridage essai gratuit ---------------------------------------------
function Gate({onUpgrade,label,features}){
return(
<div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"48px 28px
<div style={{width:72,height:72,borderRadius:"50%",background:"#FF6B3515",border:"2px s
<div>
<div style={{fontSize:20,fontFamily:"'Bebas Neue',sans-serif",letterSpacing:2,marginB
<div style={{fontSize:12,color:"#555",lineHeight:1.7}}>{label}</div>
</div>
<div style={{background:"#0D0D0D",border:"1px solid #FF6B3522",borderRadius:10,padding:
<div style={{fontSize:9,color:"#FF6B35",letterSpacing:2,marginBottom:10}}>CE QUE TU D
{(features||["Press Kit IA illimité","Email booking IA","Contacts salles directs","12
<div key={i} style={{display:"flex",gap:8,fontSize:11,color:"#888",padding:"4px 0"}
<span style={{color:"#FF6B35",flexShrink:0}}>✓</span>{f}
</div>
))}
</div>
<button className="btn" style={{maxWidth:320}} onClick={onUpgrade}>S'abonner dès 9,90€/
<div style={{fontSize:10,color:"#888",letterSpacing:1}}>3 jours d'essai · Sans engageme
</div>
);
}
// --- PRESS KIT ----------------------------------------------------------------
function PressKit({projects,plan,goPlan}){
const FMTS=[{id:"court",l:"Bio courte",i:" ",d:"~100 mots"},{id:"long",l:"Bio longue",i:"
const [data,setData]=useState({});const [fmt,setFmt]=useState("court");const [phase,setPhas
const sf=FMTS.find(f=>f.id===fmt);
if(plan==="free"){
return(
<div style={{minHeight:"100vh",background:"#080808",color:"#F0EDE8",fontFamily:"'Inter'
<Hdr sub="PRESS KIT GENERATOR"/>
<Gate onUpgrade={goPlan} label="Génère bio, email booking et pitch Spotify en quelque
</div>
);
}
const gen=async()=>{
if(left<=0){goPlan();return;}setPhase("loading");
const d=data;const P={court:`Bio courte ~100 mots, accrocheur, réseaux. FR.\nArtiste:${d.
try{const res=await fetch("/api/claude",{method:"POST",headers:{"Content-Type":"applicati
};
return(
<div style={{minHeight:"100vh",background:"#080808",color:"#F0EDE8",fontFamily:"'Inter',s
<Hdr sub="PRESS KIT GENERATOR" right={plan==="free"&&<div className="pill" style={{back
{phase==="form"&&(
<div style={{padding:"18px 18px 0"}}>
{projects.length>0&&<div style={{marginBottom:16}}><div style={{fontSize:9,color:"#
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16}}>
{FMTS.map(f=><button key={f.id} onClick={()=>setFmt(f.id)} style={{background:fmt
<div style={{fontSize:18,marginBottom:4}}>{f.i}</div><div style={{fontSize:11}}
</button>)}
</div>
{[{k:"nom",l:"NOM D'ARTISTE *",p:"Saya…"},{k:"genre",l:"GENRE *",p:"Afro Pop…"},{k:
<div key={f.k} style={{marginBottom:10}}><label style={{fontSize:11,color:"#888",
))}
<div style={{marginTop:16,paddingBottom:20}}><button className="btn" disabled={!dat
</div>
)}
{phase==="loading"&&<div style={{display:"flex",flexDirection:"column",alignItems:"cent
{phase==="result"&&(
<div style={{padding:"18px 18px 20px"}}>
<div style={{background:"#0D0D0D",border:"1px solid #FF6B3522",borderRadius:8,paddi
<div style={{background:"#0D0D0D",border:"1px solid #141414",borderRadius:8,padding
<div style={{display:"flex",gap:10,marginTop:14}}>
<button style={{flex:1,background:"none",border:`1px solid ${copied?"#00C9A7":"#F
<button className="btn-o" onClick={()=>setPhase("form")}>Modifier</button>
</div>
</div>
)}
</div>
);
}
// --- BOOKING -----------------------------------------------------------------
function Booking({plan,goPlan}){
const [tab,setTab]=useState("salles");const [sel,setSel]=useState(null);const [emailSalle,s
const tf=(k,v)=>typeof v==="boolean"?setFilters(f=>({...f,[k]:!f[k]})):setFilters(f=>({...f
const filtered=SALLES.filter(s=>{const q=search.toLowerCase();if(q&&!s.nom.toLowerCase().in
if(plan==="free")return(
<div style={{minHeight:"100vh",background:"#080808",color:"#F0EDE8",fontFamily:"'Inter',s
<Hdr sub="MODULE BOOKING" accent="#20C997"/>
<div style={{padding:"40px 24px",textAlign:"center",display:"flex",flexDirection:"colum
<div style={{fontSize:44}}> </div>
<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:26,letterSpacing:3}}>MODUL
<div style={{fontSize:12,color:"#666",lineHeight:1.8,maxWidth:280}}>Trouve des salles
<div style={{background:"#0D0D0D",border:"1px solid #20C99722",borderRadius:10,paddin
<div style={{fontSize:9,color:"#20C997",letterSpacing:2,marginBottom:10}}>INCLUS DA
{["23 salles avec contacts directs","Opportunités en temps réel","Email booking IA
</div>
<button className="btn" style={{background:"#20C997",color:"#000"}} onClick={goPlan}>
</div>
</div>
);
return(
<div style={{minHeight:"100vh",background:"#080808",color:"#F0EDE8",fontFamily:"'Inter',s
<Hdr sub="MODULE BOOKING" accent="#20C997"/>
<div style={{display:"flex",borderBottom:"1px solid #111"}}>
<button className={`tab ${tab==="salles"?"on":""}`} onClick={()=>setTab("salles")}>
<button className={`tab ${tab==="oppos"?"on":""}`} onClick={()=>setTab("oppos")}> O
<button className={`tab ${tab==="guide"?"on":""}`} onClick={()=>setTab("guide")}> G
</div>
{tab==="salles"&&(
<div>
<div style={{padding:"12px 18px 0"}}><input value={search} onChange={e=>setSearch(e
<div style={{padding:"8px 18px 0",display:"flex",gap:5,overflowX:"auto",scrollbarWi
{[{k:"smac",l:"SMAC"},{k:"sub",l:"Subventionné"},{k:"res",l:"Résidence"}].map(f=>
{["idf","paca","aura","occitanie","bretagne","nord","bordeaux","alsace"].map(r=><
{["afro","hip-hop","rnb","electro","pop","rock","world"].map(g=><button key={g} o
</div>
<div style={{padding:"10px 18px",display:"flex",flexDirection:"column",gap:10}}>
<div style={{fontSize:10,color:"#888",letterSpacing:1.5,fontWeight:600}}>{filtere
{filtered.map((s,i)=>(
<div key={s.id} className="card fu" style={{padding:0,overflow:"hidden",cursor:
<div style={{height:2,background:s.color}}/>
<div style={{padding:"13px 14px"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex
<div><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:15,letter
<div style={{display:"flex",flexDirection:"column",gap:3,alignItems:"flex
{s.smac&&<span className="pill" style={{background:"#20C99715",color:"#
{s.subv&&<span className="pill" style={{background:"#FFD43B15",color:"#
{s.res&&<span className="pill" style={{background:"#845EF715",color:"#8
</div>
</div>
<div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:7}}>{s.genre
<div style={{display:"flex",justifyContent:"space-between",alignItems:"cent
</div>
</div>
))}
</div>
</div>
)}
{tab==="oppos"&&(
<div style={{padding:"14px 18px",display:"flex",flexDirection:"column",gap:10}}>
{OPPOS.map((o,i)=>{
const d=Math.ceil((new Date(o.deadline)-new Date())/86400000);
const types={premiere_partie:"1ÈRE PARTIE",residence:"RÉSIDENCE",concert:"CONCERT
return(
<div key={o.id} className="card fu" style={{padding:16,borderColor:`${o.color}1
<div style={{position:"relative",paddingLeft:12}}>
<div style={{position:"absolute",top:0,left:0,bottom:0,width:2,background:o
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex
<div>
<span className="pill" style={{background:`${o.color}15`,color:o.color,
<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:15,letterSpa
<div style={{fontSize:10,color:"#999"}}>{o.ville} · {new Date(o.date).t
</div>
<div style={{textAlign:"right",flexShrink:0}}><div style={{fontSize:14,fo
</div>
<div style={{fontSize:11,color:"#666",lineHeight:1.6,marginBottom:8}}>{o.de
<button onClick={()=>setEmailSalle(SALLES.find(s=>s.nom===o.salle)||SALLES[
</div>
</div>
);
})}
</div>
)}
{tab==="guide"&&(
<div style={{padding:"16px 18px 40px"}}>
{[{n:"01",t:"Prépare ton EPK",c:"#FF6B35",items:["Bio courte + longue + photo HD","
<div key={i} style={{marginBottom:20}}>
<div style={{display:"flex",alignItems:"baseline",gap:8,marginBottom:10}}><span
<div style={{background:"#0D0D0D",borderRadius:8,padding:"12px 14px"}}>{s.items
</div>
))}
</div>
)}
{sel&&(
<div className="panel"><div className="pin" style={{borderTopColor:sel.color}}>
<div style={{padding:"16px 20px",borderBottom:"1px solid #111",display:"flex",justi
<div><div style={{fontSize:9,color:sel.color,letterSpacing:2}}>FICHE SALLE</div><
<button onClick={()=>setSel(null)} style={{background:"none",border:"none",color:
</div>
<div style={{padding:"18px 20px 40px",fontFamily:"'Inter',sans-serif"}}>
<div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>{sel.smac&&<s
<p style={{fontSize:12,color:"#888",lineHeight:1.8,marginBottom:14}}>{sel.desc}</
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}
<div style={{marginBottom:14}}><div style={{fontSize:9,color:"#888",letterSpacing
<div style={{background:"#0D0D0D",borderLeft:`2px solid ${sel.color}`,borderRadiu
<div style={{background:"#0D0D0D",border:"1px solid #141414",borderRadius:7,paddi
<button className="btn" style={{background:"#20C997",color:"#000"}} onClick={()=>
</div>
</div></div>
)}
</div>
{emailSalle&&<EmailGen salle={emailSalle} onClose={()=>setEmailSalle(null)}/>}
);
}
function EmailGen({salle,onClose}){
const [d,setD]=useState({nom:"",genre:"",ville:"",streams:"",projet:"",dates:""});const [co
const gen=async()=>{
setPhase("loading");
const prompt=`Email booking professionnel et percutant (150-200 mots) pour démarcher ${sa
try{const res=await fetch("/api/claude",{method:"POST",headers:{"Content-Type":"applicati
};
return(
<div className="panel"><div className="pin" style={{borderTopColor:salle.color}}>
<div style={{padding:"16px 20px",borderBottom:"1px solid #111",display:"flex",justifyCo
{phase==="form"&&(
<div style={{padding:"18px 20px 40px",display:"flex",flexDirection:"column",gap:12,fo
<div style={{background:"#0D0D0D",border:`1px solid ${salle.color}18`,borderRadius:
{[{k:"nom",l:"NOM D'ARTISTE *",p:"Saya…"},{k:"genre",l:"GENRE *",p:salle.genres[0]}
<button className="btn" style={{background:"#20C997",color:"#000",marginTop:8}} dis
</div>
)}
{phase==="loading"&&<div style={{display:"flex",flexDirection:"column",alignItems:"cent
{phase==="result"&&(
<div style={{padding:"18px 20px 40px",fontFamily:"'Inter',sans-serif"}}>
<div style={{background:"#0D0D0D",border:`1px solid ${salle.color}22`,borderRadius:
<div style={{background:"#0D0D0D",border:"1px solid #141414",borderRadius:8,padding
<div style={{display:"flex",gap:10}}>
<button style={{flex:1,background:"none",border:`1px solid ${copied?"#00C9A7":`${
<button className="btn-o" onClick={()=>setPhase("form")}>Modifier</button>
</div>
</div>
)}
</div></div>
);
}
// --- ANNUAIRE -----------------------------------------------------------------
function Annuaire(){
const [section,setSection]=useState(null);const [search,setSearch]=useState("");const [deta
const SECS=[
{id:"salles",icon:" ",label:"Salles de concert",color:"#FF6B35",data:SALLES,count:SALLES
{id:"enreg",icon:" ",label:"Studios d'enregistrement",color:"#845EF7",data:STUDIOS_ENREG
{id:"repet",icon:" ",label:"Studios de répétition",color:"#00C9A7",data:STUDIOS_REPET,co
{id:"residences",icon:" ",label:"Résidences artistiques",color:"#C8A96E",data:RESIDENCES
{id:"tremplins",icon:" ",label:"Tremplins & Scènes",color:"#FFD43B",data:TREMPLINS,count
];
const sec=SECS.find(s=>s.id===section?.id);
const getItems=()=>{if(!sec)return[];const q=search.toLowerCase();return sec.data.filter(i=
return(
<div style={{minHeight:"100vh",background:"#080808",color:"#F0EDE8",fontFamily:"'Inter',s
<Hdr sub="ANNUAIRE" accent="#C8A96E" right={section&&<button className="btn-o" style={{
{!section&&(
<div style={{padding:"14px 18px",display:"flex",flexDirection:"column",gap:10}}>
<div style={{background:"#0D0D0D",border:"1px solid #C8A96E18",borderRadius:8,paddi
{SECS.map((s,i)=>(
<div key={s.id} className="card fu" style={{padding:0,overflow:"hidden",cursor:"p
<div style={{height:2,background:s.color}}/>
<div style={{padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
<div style={{width:44,height:44,borderRadius:10,background:`${s.color}15`,bor
<div style={{flex:1}}><div style={{fontFamily:"'Bebas Neue',sans-serif",fontS
<span style={{fontSize:20,color:"#222"}}>›</span>
</div>
</div>
))}
</div>
)}
{section&&(
<div>
<div style={{padding:"12px 18px"}}><input value={search} onChange={e=>setSearch(e.t
<div style={{padding:"4px 18px",display:"flex",flexDirection:"column",gap:10}}>
<div style={{fontSize:10,color:"#888",letterSpacing:1.5,fontWeight:600}}>{getItem
{getItems().map((item,i)=>{
const isSalle=section.id==="salles";const color=isSalle?item.color:sec?.color||
return(
<div key={i} className="card fu" style={{padding:0,overflow:"hidden",cursor:"
<div style={{height:2,background:color}}/>
<div style={{padding:"13px 14px"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"fl
<div><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:14,lett
<div style={{display:"flex",flexDirection:"column",gap:3,alignItems:"fl
{isSalle&&item.smac&&<span className="pill" style={{background:"#20C9
{isSalle&&item.subv&&<span className="pill" style={{background:"#FFD4
{isSalle&&item.res&&<span className="pill" style={{background:"#845EF
</div>
</div>
<div style={{fontSize:11,color:"#666",lineHeight:1.5,marginBottom:7}}>{it
<div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{(item.tags||item.gen
</div>
</div>
);
})}
</div>
</div>
)}
{detail&&(
<div className="panel"><div className="pin" style={{borderTopColor:detail._color}}>
<div style={{padding:"16px 20px",borderBottom:"1px solid #111",display:"flex",justi
<div style={{padding:"18px 20px 40px",fontFamily:"'Inter',sans-serif"}}>
{detail.tips&&<div style={{background:"#0D0D0D",borderLeft:`2px solid ${detail._c
<p style={{fontSize:12,color:"#888",lineHeight:1.8,marginBottom:14}}>{detail.desc
{detail.contact&&<div style={{background:"#0D0D0D",border:"1px solid #141414",bor
<div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14}}>{(detail.tags
{detail.site&&detail.site!=="/#"&&detail.site!=="#"&&<a href={detail.site} target
</div>
</div></div>
)}
</div>
);
}
// --- BIBLIOTHÈQUE ------------------------------------------------------------
function Bibliotheque({plan,goPlan}){
const [cat,setCat]=useState(null);
const [doc,setDoc]=useState(null);
const [copied,setCopied]=useState(false);
const [tabAnn,setTabAnn]=useState(false);
const canAccess=(d)=>plan==="label"||(plan==="artiste"&&d.access==="all");
const docsForCat=(catId)=>BIBLIO_DOCS.filter(d=>d.cat===catId);
if(doc){return(
<div style={{minHeight:"100vh",background:"#080808",color:"#F0EDE8",fontFamily:"'Inter',s
<Hdr sub="BIBLIOTHÈQUE" accent="#C8A96E" right={<button className="btn-o" style={{width
<div style={{padding:"16px 18px 40px"}}>
<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
<span style={{fontSize:24}}>{doc.icon}</span>
<div><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:2}
<span className="pill" style={{background:"#C8A96E15",color:"#C8A96E",border:"1px s
</div>
<div style={{background:"#0D0D0D",border:"1px solid #141414",borderRadius:8,padding:1
<div style={{display:"flex",gap:10}}>
<button style={{flex:1,background:"none",border:`1px solid ${copied?"#00C9A7":"#C8A
</div>
</div>
</div>
);}
return(
<div style={{minHeight:"100vh",background:"#080808",color:"#F0EDE8",fontFamily:"'Inter',s
<Hdr sub="BIBLIOTHÈQUE" accent="#C8A96E"/>
<div style={{display:"flex",borderBottom:"1px solid #111"}}>
<button className={`tab ${!tabAnn?"on":""}`} onClick={()=>setTabAnn(false)}> Docume
<button className={`tab ${tabAnn?"on":""}`} onClick={()=>setTabAnn(true)}> Annuaire
</div>
{!tabAnn&&(
<div style={{padding:"14px 18px"}}>
{plan==="free"&&<div style={{background:"#0D0D0D",border:"1px solid #C8A96E22",bord
{plan==="artiste"&&<div style={{background:"#0D0D0D",border:"1px solid #FF6B3518",b
{BIBLIO_CATS.map(cat=>{
const docs=docsForCat(cat.id);
if(!docs.length)return null;
return(
<div key={cat.id} style={{marginBottom:20}}>
<div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
<span style={{fontSize:16}}>{cat.icon}</span>
<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:14,letterSpacing
<div style={{flex:1,height:1,background:"#111",marginLeft:8}}/>
</div>
<div style={{display:"flex",flexDirection:"column",gap:8}}>
{docs.map(d=>{
const ok=canAccess(d);
return(
<div key={d.id} className="card" style={{padding:"12px 14px",opacity:ok
<div style={{display:"flex",alignItems:"center",gap:10}}>
<span style={{fontSize:18,flexShrink:0}}>{d.icon}</span>
<div style={{flex:1}}>
<div style={{fontSize:12,color:ok?"#DDD":"#555",fontWeight:500,ma
<div style={{fontSize:10,color:"#888",lineHeight:1.5}}>{d.resume}
</div>
{ok?<span style={{color:cat.color,fontSize:16,flexShrink:0}}>›</spa
</div>
</div>
);
})}
</div>
</div>
);
})}
</div>
)}
{tabAnn&&(
<div style={{padding:"14px 18px"}}>
<div style={{background:"#0D0D0D",border:"1px solid #C8A96E18",borderRadius:8,paddi
{["Distribution","Promotion","Booking","Droits","Financement","Juridique"].map(grp=
const items=ANNUAIRES_EXT.filter(a=>a.cat===grp);
if(!items.length)return null;
return(
<div key={grp} style={{marginBottom:18}}>
<div style={{fontSize:9,letterSpacing:2,color:"#555",marginBottom:8}}>{grp.to
{items.map(a=>(
<a key={a.id} href={a.url} target="_blank" rel="noopener noreferrer" style=
<div style={{width:36,height:36,borderRadius:8,background:`${a.color}15`,
<div style={{flex:1}}><div style={{fontSize:12,color:"#DDD",fontWeight:50
<span style={{color:a.color,fontSize:14}}>↗</span>
</a>
))}
</div>
);
})}
</div>
)}
</div>
);
}
// --- SUBVENTIONS --------------------------------------------------------------
function Subventions({plan,goPlan}){
if(plan==="free"){
return(
<div style={{minHeight:"100vh",background:"#080808",color:"#F0EDE8",fontFamily:"'Inter'
<Hdr sub="FINANCEMENT & DÉMARCHES" accent="#F03E3E"/>
<Gate onUpgrade={goPlan} label="Matching personnalisé avec les 9+ aides françaises (C
</div>
);
}
const [ans,setAns]=useState({});const [qi,setQi]=useState(0);const [phase,setPhase]=useStat
const answer=(qid,val)=>{const n={...ans,[qid]:val};setAns(n);if(qi<FINANCEMENT_QS.length-1
const allDone=Object.keys(ans).length===FINANCEMENT_QS.length;
const results=AIDES.map(a=>({...a,score:scoreAide(a,ans)})).filter(a=>a.score>=40).sort((a,
const top=results.filter(a=>a.score>=70);const possible=results.filter(a=>a.score>=40&&a.sc
return(
<div style={{minHeight:"100vh",background:"#080808",color:"#F0EDE8",fontFamily:"'Inter',s
<Hdr sub="FINANCEMENT & DÉMARCHES" accent="#F03E3E" right={<div style={{display:"flex",
{phase==="results"&&<button className="btn-o" style={{width:"auto",padding:"6px 12px"
<button className="btn-o" style={{width:"auto",padding:"6px 12px",fontSize:10,borderC
</div>}/>
{showD&&(
<div style={{padding:"14px 18px",display:"flex",flexDirection:"column",gap:10}}>
<div style={{background:"#0D0D0D",border:"1px solid #F03E3E18",borderRadius:8,paddi
{DEMARCHES.map((d,i)=>(
<div key={d.id} className="card fu" style={{padding:0,overflow:"hidden",cursor:"p
<div style={{height:2,background:d.color}}/>
<div style={{padding:"13px 14px",display:"flex",alignItems:"center",gap:12}}>
<div style={{width:40,height:40,borderRadius:10,background:`${d.color}15`,bor
<div style={{flex:1}}><div style={{fontFamily:"'Bebas Neue',sans-serif",fontS
<span style={{fontSize:18,color:"#222"}}>›</span>
</div>
</div>
))}
</div>
)}
{selD&&(
<div className="panel"><div className="pin" style={{borderTopColor:selD.color}}>
<div style={{padding:"16px 20px",borderBottom:"1px solid #111",display:"flex",justi
<div style={{padding:"18px 20px 40px",fontFamily:"'Inter',sans-serif",display:"flex
<p style={{fontSize:12,color:"#888",lineHeight:1.8}}>{selD.desc}</p>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>{[{l:"Délai",v
<div><div style={{fontSize:9,color:"#888",letterSpacing:2,marginBottom:8}}>DOCUME
<div><div style={{fontSize:9,color:"#888",letterSpacing:2,marginBottom:8}}>FORMAT
{selD.tips&&<div style={{background:"#0D0D0D",borderLeft:`2px solid ${selD.color}
<a href={selD.lien} target="_blank" rel="noopener noreferrer" className="lnk" sty
</div>
</div></div>
)}
{!showD&&phase==="q"&&(
<div style={{padding:"20px 18px"}}>
<div style={{display:"flex",gap:5,marginBottom:24}}>{FINANCEMENT_QS.map((q,i)=><div
{FINANCEMENT_QS.map((q,i)=>{if(i!==qi)return null;return(
<div key={q.id} className="fu">
<div style={{fontSize:11,color:"#AAA",letterSpacing:1,fontWeight:600,marginBott
<div style={{fontSize:18,fontFamily:"'Bebas Neue',sans-serif",letterSpacing:2,m
<div style={{display:"flex",flexDirection:"column",gap:8}}>{q.opts.map(opt=><bu
<div style={{display:"flex",justifyContent:"space-between",marginTop:24}}>{i>0?
</div>
);})}
</div>
)}
{!showD&&phase==="results"&&(
<div style={{padding:"18px 18px 20px"}}>
<div style={{background:"#0D0D0D",border:"1px solid #F03E3E18",borderRadius:8,paddi
{top.length>0&&<><div style={{fontSize:9,letterSpacing:3,color:"#F03E3E",marginBott
{possible.length>0&&<><div style={{fontSize:9,letterSpacing:3,color:"#999",marginTo
</div>
)}
</div>
);
}
function AideCard({aide,expanded,onToggle}){
return(
<div style={{background:"#0D0D0D",border:`1px solid ${expanded?aide.color+"44":"#1A1A1A"}
<div style={{padding:"13px 14px",cursor:"pointer",display:"flex",gap:10,alignItems:"fle
<span style={{fontSize:18,flexShrink:0}}>{aide.icon}</span>
<div style={{flex:1}}><div style={{fontSize:12,color:expanded?aide.color:"#CCC",lineH
<span style={{fontSize:10,color:aide.score>=70?aide.color:"#999",background:`${aide.s
</div>
{expanded&&(
<div style={{padding:"0 14px 14px",borderTop:"1px solid #111"}}>
<p style={{fontSize:11,color:"#777",lineHeight:1.7,margin:"12px 0"}}>{aide.desc}</p
<div style={{fontSize:11,color:"#AAA",letterSpacing:1,fontWeight:600,marginBottom:8
{aide.etapes.map((e,i)=><div key={i} style={{display:"flex",gap:9,padding:"7px 0",b
<a href={aide.lien} target="_blank" rel="noopener noreferrer" className="lnk" style
</div>
)}
</div>
);
}
// --- RÉSEAU -------------------------------------------------------------------
function Reseau({user}){
const [annonces,setAnnonces]=useState(ANNONCES_INIT);const [showForm,setShowForm]=useState(
const filtered=annonces.filter(a=>filter==="tous"||a.type===filter);
const publish=()=>{if(!newA.role||!newA.desc)return;setAnnonces(prev=>[{id:Date.now(),...ne
return(
<div style={{minHeight:"100vh",background:"#080808",color:"#F0EDE8",fontFamily:"'Inter',s
<Hdr sub="RÉSEAU" accent="#00C9A7" right={<button onClick={()=>setShowForm(true)} style
<div style={{padding:"10px 18px",display:"flex",gap:6,borderBottom:"1px solid #0F0F0F"}
{[{k:"tous",l:"Tous"},{k:"cherche",l:"Cherche"},{k:"propose",l:"Propose"}].map(f=><bu
</div>
<div style={{padding:"12px 18px",display:"flex",flexDirection:"column",gap:10}}>
{filtered.map((a,i)=>(
<div key={a.id} className="card fu" style={{padding:14,borderColor:`${a.color}15`,a
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start
<div style={{display:"flex",alignItems:"center",gap:8}}>
<div style={{width:32,height:32,borderRadius:"50%",background:`${a.color}18`,
<div><div style={{fontSize:11,color:"#CCC"}}>{a.nom}</div><div style={{fontSi
</div>
<span className="pill" style={{background:a.type==="cherche"?"#FF6B3515":"#00C9
</div>
<div style={{fontSize:13,color:a.color,fontFamily:"'Bebas Neue',sans-serif",lette
<div style={{fontSize:9,color:"#555",marginBottom:6}}>{a.genre}</div>
<div style={{fontSize:11,color:"#888",lineHeight:1.6,marginBottom:8}}>{a.desc}</d
<div style={{display:"flex",gap:4,flexWrap:"wrap",alignItems:"center"}}>
{a.tags.slice(0,3).map(t=><span key={t} className="chip">{t}</span>)}
<button style={{marginLeft:"auto",background:"none",border:`1px solid ${a.color
</div>
</div>
))}
</div>
{showForm&&(
<div className="panel"><div className="pin" style={{borderTopColor:"#00C9A7"}}>
<div style={{padding:"16px 20px",borderBottom:"1px solid #111",display:"flex",justi
<div style={{padding:"18px 20px 40px",display:"flex",flexDirection:"column",gap:12,
<div style={{display:"flex",gap:8}}>{[{v:"cherche",l:"Je cherche"},{v:"propose",l
{[{k:"role",l:"RÔLE *",p:"Chanteuse, Beatmaker, Studio…"},{k:"genre",l:"GENRE",p:
<div><label style={{fontSize:11,color:"#888",letterSpacing:1.5,display:"block",ma
<button className="btn" style={{background:"#00C9A7",color:"#000",marginTop:8}} d
</div>
</div></div>
)}
</div>
);
}
// --- ACTUALITÉS ---------------------------------------------------------------
function Actualites(){
const [loading,setLoading]=useState(false);const [articles,setArticles]=useState(null);cons
const CATS=[{l:"Concours de chant",q:"concours chant France 2025"},{l:"Jams sessions",q:"ja
const search=async(q)=>{
setLoading(true);setSearched(true);setQuery(q);
try{
const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"
const json=await res.json();const text=json.content?.filter(b=>b.type==="text").map(b=>
try{setArticles(JSON.parse(clean));}catch{setArticles([]);}
}catch{setArticles([]);}
setLoading(false);
};
const catColors={"Concours":"#FF6B35","Festival":"#845EF7","Appel":"#00C9A7","Jam":"#FFD43B
const getColor=(cat)=>Object.entries(catColors).find(([k])=>cat?.includes(k))?.[1]||"#444";
return(
<div style={{minHeight:"100vh",background:"#080808",color:"#F0EDE8",fontFamily:"'Inter',s
<Hdr sub="ACTUALITÉS" accent="#74C0FC"/>
<div style={{padding:"12px 18px"}}>
<div style={{display:"flex",gap:8,marginBottom:10}}><input value={query} onChange={e=
<div style={{display:"flex",gap:5,overflowX:"auto",scrollbarWidth:"none",paddingBotto
{CATS.map(c=><button key={c.l} onClick={()=>search(c.q)} style={{background:"#0D0D0
</div>
</div>
{!searched&&<div style={{padding:"40px 24px",textAlign:"center",display:"flex",flexDire
{loading&&<div style={{display:"flex",flexDirection:"column",alignItems:"center",justif
{!loading&&articles&&(
<div style={{padding:"12px 18px",display:"flex",flexDirection:"column",gap:10}}>
{articles.length===0&&<div style={{textAlign:"center",padding:"30px 0",color:"#888"
{articles.map((a,i)=>(
<div key={i} className="card fu" style={{padding:"15px",animationDelay:`${i*0.05}
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-sta
<div style={{fontSize:13,color:"#DDD",fontWeight:500,lineHeight:1.4,marginBotto
<div style={{fontSize:11,color:"#777",lineHeight:1.6,marginBottom:8}}>{a.resume
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}
</div>
))}
</div>
)}
</div>
);
}
// --- PROFIL -------------------------------------------------------------------
function Profil({plan,setPlan,user,goPlan}){
const PI={free:{l:"GRATUIT",c:"#444"},artiste:{l:"ARTISTE",c:"#FF6B35"},label:{l:"LABEL",c:
return(
<div style={{minHeight:"100vh",background:"#080808",color:"#F0EDE8",fontFamily:"'Inter',s
<Hdr sub="MON COMPTE"/>
<div style={{padding:"20px 18px",display:"flex",flexDirection:"column",gap:14}}>
<div className="card" style={{padding:18}}><div style={{fontSize:11,color:"#AAA",lett
<div className="card" style={{padding:18,borderColor:`${cur.c}22`}}><div style={{font
<div style={{background:"#0A1A0A",border:"1px solid #00C9A722",borderRadius:8,padding
<div className="card" style={{padding:16}}><div style={{fontSize:11,color:"#AAA",lett
</div>
</div>
);
}
// --- CHATBOT IA ---------------------------------------------------------------
const COACH_SYS=`Tu es INDY Coach, l'assistant IA de l'application INDY pour artistes indépen
function Chatbot({plan,onUpgrade,onClose}){
const [msgs,setMsgs]=useState([{role:"assistant",content:"Salut ! Je suis INDY Coach const [input,setInput]=useState("");
const [loading,setLoading]=useState(false);
\n\n
const send=async()=>{
if(!input.trim()||loading)return;
const userMsg={role:"user",content:input.trim()};
setMsgs(prev=>[...prev,userMsg]);setInput("");setLoading(true);
try{
const res=await fetch("/api/claude",{method:"POST",headers:{"Content-Type":"application
const json=await res.json();
setMsgs(prev=>[...prev,{role:"assistant",content:json.content?.map(b=>b.text||"").join(
}catch{setMsgs(prev=>[...prev,{role:"assistant",content:"Erreur de connexion. Réessaie."}
setLoading(false);
};
if(plan==="free"){
return(
<div className="panel"><div className="pin" style={{borderTopColor:"#FF6B35"}}>
<div style={{padding:"16px 20px",borderBottom:"1px solid #111",display:"flex",justify
<div><div style={{fontSize:9,color:"#FF6B35",letterSpacing:2}}>INDY COACH IA</div><
<button onClick={onClose} style={{background:"none",border:"none",color:"#999",font
</div>
<Gate onUpgrade={onUpgrade} label="Ton coach IA disponible 24h/24 pour répondre à tou
</div></div>
);
}
return(
<div className="panel"><div className="pin" style={{borderTopColor:"#FF6B35",display:"fle
<div style={{padding:"14px 20px",borderBottom:"1px solid #111",display:"flex",justifyCo
<div style={{display:"flex",alignItems:"center",gap:10}}>
<div style={{width:32,height:32,borderRadius:"50%",background:"#FF6B3518",border:"1
<div>
<div style={{fontSize:13,fontFamily:"'Bebas Neue',sans-serif",letterSpacing:2}}>I
<div style={{display:"flex",alignItems:"center",gap:5}}>
<div style={{width:6,height:6,borderRadius:"50%",background:"#00C9A7",animation
<div style={{fontSize:9,color:"#00C9A7",letterSpacing:1}}>EN LIGNE</div>
</div>
</div>
</div>
<button onClick={onClose} style={{background:"none",border:"none",color:"#999",fontSi
</div>
<div style={{flex:1,overflowY:"auto",padding:"16px 18px",display:"flex",flexDirection:"
{msgs.map((m,i)=>(
<div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex
<div style={{maxWidth:"90%",padding:"11px 13px",borderRadius:m.role==="user"?"14p
</div>
))}
{loading&&<div style={{display:"flex",justifyContent:"flex-start"}}><div style={{padd
</div>
{msgs.length<=1&&(
<div style={{padding:"0 18px 10px",display:"flex",gap:6,overflowX:"auto",scrollbarWid
{["Déposer à la SACEM ?","C'est quoi un ISRC ?","Pitcher Spotify ?","Aides CNM ?","
<button key={s} onClick={()=>{setInput(s);}} style={{background:"#0D0D0D",border:
))}
</div>
)}
</div>
</div></div>
<div style={{padding:"11px 18px 14px",borderTop:"1px solid #0F0F0F",flexShrink:0,positi
<input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==
<button onClick={send} disabled={!input.trim()||loading} style={{position:"absolute",
);
}
// --- APP ROOT -----------------------------------------------------------------
export default function INDYComplete() {
const [screen,setScreen]=useState("landing");
const [view,setView]=useState("dashboard");
const [plan,setPlan]=useState("free");
const [user,setUser]=useState(null);
const [projects,setProjects]=useState(INIT_PROJECTS);
const [activeId,setActiveId]=useState(null);
const goPlan=()=>setScreen("paywall");
const goCoach=(id)=>{setActiveId(id);setView("coach");};
const NAV=[
{id:"dashboard", l:"Board", i:" "},
{id:"coach", l:"Coach", i:" "},
{id:"presskit", l:"Press Kit",i:" "},
{id:"booking", l:"Booking", i:" "},
{id:"more", l:"Plus", i:"✦"},
];
const [showMore,setShowMore]=useState(false);
const [showChat,setShowChat]=useState(false);
const MORE_MENU=[
{id:"subventions", l:"Financement",i:" ",c:"#F03E3E"},
{id:"bibliotheque",l:"Biblio", i:" ",c:"#C8A96E"},
{id:"annuaire", l:"Annuaire", i:" ",c:"#FFD43B"},
{id:"reseau", l:"Réseau", i:" ",c:"#00C9A7"},
{id:"profil", l:"Compte", i:" ",c:"#FF6B35"},
];
if(screen==="landing")return(<div style={{background:"#060606",minHeight:"100vh"}}><style>{
if(screen==="onboarding")return(<div style={{background:"#080808",minHeight:"100vh"}}><styl
if(screen==="paywall")return(<div style={{background:"#080808",minHeight:"100vh"}}><style>{
return(
<div style={{background:"#080808",minHeight:"100vh"}}>
<style>{CSS}</style>
<div style={{paddingBottom:64}}>
{view==="dashboard" &&<Dashboard projects={projects} setProjects={setProjects} goCoa
{view==="coach" &&<Coach projects={projects} setProjects={setProjects} activeId=
{view==="presskit" &&<PressKit projects={projects} plan={plan} goPlan={goPlan}/>}
{view==="booking" &&<Booking plan={plan} goPlan={goPlan}/>}
{view==="subventions"&&<Subventions plan={plan} goPlan={goPlan}/>}
{view==="bibliotheque"&&<Bibliotheque plan={plan} goPlan={goPlan}/>}
{view==="annuaire" &&<Annuaire/>}
{view==="reseau" &&<Reseau user={user}/>}
{view==="actualites" &&<Actualites/>}
{view==="profil" &&<Profil plan={plan} setPlan={setPlan} user={user} goPlan={goPl
</div>
{/* Menu Plus */}
{showMore&&(
<div style={{position:"fixed",inset:0,zIndex:100}} onClick={()=>setShowMore(false)}>
<div style={{position:"absolute",bottom:64,left:0,right:0,background:"#0A0A0A",bord
{MORE_MENU.map(m=>(
<button key={m.id} onClick={()=>{setView(m.id);setShowMore(false);}} style={{ba
<span style={{fontSize:20}}>{m.i}</span>
<span style={{fontSize:8,color:view===m.id?m.c:"#444",fontFamily:"'Inter',san
</button>
))}
</div>
</div>
)}
{/* Chatbot bouton flottant */}
{!showChat&&(
<button onClick={()=>setShowChat(true)} style={{position:"fixed",bottom:76,right:16,w
</button>
)}
{/* Chatbot panel */}
{showChat&&<Chatbot plan={plan} onUpgrade={()=>{setShowChat(false);goPlan();}} onClose=
{/* Bottom nav */}
<div style={{position:"fixed",bottom:0,left:0,right:0,background:"#080808",borderTop:"1
{NAV.map(n=>{
const isMore=n.id==="more";const act=isMore?showMore:view===n.id;
return(
<button key={n.id} className="nav" onClick={()=>{if(isMore){setShowMore(!showMore
<span style={{fontSize:18,filter:act?"none":"grayscale(0.8)",opacity:act?1:0.35
<span style={{fontSize:10,letterSpacing:0.5,color:act?"#FF6B35":"#666",transiti
{act&&<div style={{width:14,height:2,borderRadius:1,background:"#FF6B35",margin
</button>
);
})}
</div>
</div>
);
}