---
title: "Perché Mush è sulla strada giusta: la risposta illuminante"
description: "Qualche giorno fa ho avuto il piacere di scambiare due parole con uno sviluppatore open source molto attivo nella community di Rust. Avevo in mente un’idea ben precisa..."
date: 2025-05-12T16:56:11.865Z
tags: ["mush", "shell", "devex", "rust"]
authors: ["Francesco Bianco"]
---

Qualche giorno fa ho avuto il piacere di scambiare due parole con uno sviluppatore open source molto attivo nella community di Rust. Avevo in mente un’idea ben precisa: cercare conferme su alcuni principi che mi guidano nello sviluppo di **Mush**, lo strumento che vuole portare la *developer experience* di Rust nel mondo dei progetti shell.

Gli ho fatto una domanda semplice, ma carica di aspettative:
**"Dal tuo punto di vista, quali sono tre motivi per preferire Rust per il mio prossimo progetto? Si tratta di un'applicazione CLI che deve interagire con API pubbliche e locali."**

La sua risposta è stata tanto sintetica quanto densa di significato:

> *"Io uso Rust per le mie CLI per la gestione degli errori (la preferisco alle eccezioni), il type system espressivo, la developer experience (cargo + crates.io) e il binario statico (non ha bisogno di un runtime tipo Python o Java o npm)."*

### Decostruendo la risposta

Ascoltandolo, mi si è accesa una lampadina. Il mio interlocutore ha descritto esattamente i **valori fondanti di Mush**, solo che li ha espressi nel linguaggio di Rust. Vediamoli nel dettaglio.

---

#### 1. **Gestione degli errori prevedibile e robusta**

Rust evita il meccanismo delle eccezioni, preferendo pattern espliciti e sicuri come `Result` e `Option`. Questo approccio si traduce in codice più leggibile, meno fragile, e soprattutto più *composable*.

Con **Mush**, sto cercando di portare un’analoga chiarezza e controllo nella gestione degli errori nei progetti shell, usando strutture dati e costrutti che rendano gli errori visibili, gestibili e testabili, evitando la classica giungla di `exit codes` e `stderr`.

---

#### 2. **Type system espressivo**

Il sistema di tipi di Rust è una delle sue armi più potenti: ti guida mentre scrivi codice, ti protegge da errori sottili e rende chiaro cosa può succedere a runtime.

In Mush, il concetto è simile: anche se siamo in un contesto molto più dinamico, voglio dare agli sviluppatori **strumenti che aiutino a modellare e validare i dati** che passano tra i comandi — strutture semantiche, non solo stringhe da “pippare” da un comando all’altro.

---

#### 3. **Developer Experience: cargo + crates.io**

Quando usi Rust, l’esperienza di sviluppo è fluida: `cargo` semplifica tutto, da `build` a `test`, a `publish`, e l’ecosistema `crates.io` rende facile riusare codice.

Mush vuole fare lo stesso per gli script e le CLI basate su shell: avere **un sistema di pacchettizzazione, condivisione e distribuzione modulare**, unito a una UX pensata per sviluppatori, in cui *“scrivere uno script bash” non significhi sacrificare struttura, testabilità e composizione*.

---

#### 4. **Binario statico, zero runtime**

Questa è una delle forze più pratiche di Rust: produce binari autonomi, facili da distribuire. Anche qui, Mush prende ispirazione diretta: il mio obiettivo è permettere **l’uso di script e componenti Mush senza dipendenze invasive o ambienti runtime fragili**. Scrivi, componi, pacchettizzi, e gira ovunque, subito.

---

### Conclusione: perché questa risposta mi ha dato fiducia

Sentire elencare questi punti mi ha confermato che **Mush non è solo una buona idea — è un’idea che intercetta un bisogno reale**, già risolto in un linguaggio moderno e amato come Rust. E ora è il momento di portare quegli stessi benefici dove, finora, hanno regnato bash e i suoi mille workaround.

Mush non vuole sostituire la shell. Vuole **evolvere la shell** con gli stessi principi che hanno reso Rust un riferimento per chi costruisce strumenti solidi, sicuri e belli da usare.

---

Vuoi vedere Mush in azione o contribuire?
[👉 Dai un’occhiata al repo](https://mush.javanile.org/) o scrivimi, mi piacerebbe sapere cosa ne pensi.
