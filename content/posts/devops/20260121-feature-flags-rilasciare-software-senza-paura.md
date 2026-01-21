---
title: "Feature Flags: rilasciare software senza paura"
description: "Un omaggio a Mickey Gousset e al suo contributo nel mondo DevOps"
date: 2026-01-21T14:48:30.502Z
tags: ["devops", "tag1", "tag2"]
authors: ["Francesco Bianco"]
giscus: ""
---

Nel mondo DevOps esistono concetti semplici che, se usati bene, cambiano radicalmente il modo in cui costruiamo e rilasciamo software.
I **feature flags** sono uno di questi.

Ho deciso di scrivere questo articolo come **omaggio a Mickey Gousset**, DevOps Architect nel team **GitHub FastTrack**, divulgatore instancabile e autore di uno dei talk più chiari e onesti che abbia visto sul tema: *“Feature Flags for Better DevOps”*.

Non solo perché spiega *cosa sono* i feature flags, ma soprattutto perché spiega **come usarli senza farsi male**.

## Chi è Mickey Gousset (e perché ascoltarlo)

Mickey Gousset lavora ogni giorno aiutando team e aziende a diventare “più DevOps”, spesso partendo da GitHub come piattaforma centrale.
Oltre al lavoro sul campo, è anche un **content creator**: blog, Twitch, YouTube, repository demo, esempi pratici.

La cosa che colpisce di più del suo approccio è che **non vende magia**.
Parla di DevOps come di una disciplina concreta, fatta di compromessi, responsabilità e debito tecnico.

Ed è esattamente questo il tono del suo lavoro sui feature flags.

## Cosa sono davvero i Feature Flags

Dal punto di vista tecnico, un feature flag è banalmente un `if`.

Dal punto di vista **DevOps**, è molto di più:

> Un feature flag è un meccanismo che separa il **deploy del codice** dal **rilascio della funzionalità**.

In altre parole:

* puoi **deployare anche se la feature non è pronta**
* puoi **attivarla quando vuoi**
* puoi **decidere a chi mostrarla**
* puoi **spegnerla istantaneamente**

Questa separazione è uno dei pilastri dei team ad alte performance.

## Perché i Feature Flags contano davvero

Nel talk di Gousset vengono citati numeri che fanno riflettere:

I team DevOps più maturi:

* rilasciano codice **decine di volte più spesso**
* riducono drasticamente il tempo tra commit e produzione
* recuperano dagli incidenti molto più velocemente
* falliscono meno frequentemente

I feature flags non sono l’unica causa, ma sono uno degli **abilitatori chiave** di questo modello.

Non perché rendano il codice migliore.
Ma perché **riducono il rischio**.

## Deploy quando vuoi, rilascia quando sei pronto

Uno dei messaggi più potenti del talk è questo:

> **Deploy when you want. Release when you’re ready.**

Senza feature flags:

* deploy = rilascio
* ogni deploy è un momento di tensione

Con i feature flags:

* il deploy diventa un atto tecnico
* il rilascio diventa una decisione di business

Questo apre scenari come:

* **dark launch** (feature attiva ma invisibile)
* **canary release**
* **A/B testing**
* rollout progressivi
* feature abilitate solo per alcuni utenti

## I diversi livelli di maturità dei Feature Flags

Gousset descrive tre grandi approcci, che sono anche una scala di maturità:

### 1. Feature flag compilati

Flag hardcoded nel codice.

* richiedono rebuild e redeploy
* sono rigidi
* utili solo in casi molto limitati

### 2. Feature flag da configurazione locale

Flag in file di configurazione.

* modificabili senza rebuild
* ma difficili da gestire su larga scala

### 3. Feature flag centralizzati

Flag gestiti da un datastore o servizio centrale.

* modificabili a runtime
* auditabili
* controllabili
* scalabili

È qui che i feature flags diventano **una vera capability DevOps**.

## Dai framework open source ai Feature Flags as a Service

Nel suo lavoro, Mickey Gousset ha esplorato entrambe le strade:

* **Framework open source** (come FeatureToggle nel mondo .NET)
* **Servizi gestiti** come:

  * Azure App Configuration
  * LaunchDarkly

Il punto non è quale scegliere, ma **capire quando serve cosa**:

* piccoli team → framework semplice
* sistemi complessi → servizio dedicato

Sempre con una regola chiara: **controllo e visibilità prima di tutto**.

## Quando i Feature Flags fanno danni

Uno dei momenti più interessanti del talk è quando Gousset racconta un fallimento reale in casa Microsoft.

Feature attivate:

* globalmente
* in produzione
* il giorno stesso di un evento
* su un’unica istanza

Il risultato?
Un disastro live.

La lezione è brutale ma onesta:

* i feature flags **non eliminano il rischio**
* lo spostano
* e se usati male, lo amplificano

## La verità scomoda: i Feature Flags sono debito tecnico

Questa è forse la frase più importante di tutto il talk:

> **Un feature flag è debito tecnico dal momento in cui lo introduci.**

Ogni flag:

* aggiunge complessità
* crea combinazioni possibili
* richiede manutenzione
* va rimosso

I flag lasciati “sempre ON” o “sempre OFF” sono **codice morto travestito da sicurezza**.

## Le best practice che fanno la differenza

Gousset propone alcune regole semplici ma fondamentali:

* **Naming chiaro**
* **Logging di ogni modifica**
* **Separazione tra release flags e business flags**
* **Controllo degli accessi**
* **Review periodica e cleanup**

Sono pratiche noiose?
Sì.
Sono ciò che distingue un team maturo da uno che gioca con gli switch?
Assolutamente sì.

## Perché questo talk è ancora attuale

Il valore del contributo di Mickey Gousset non è solo tecnico.
È culturale.

Parla di feature flags come:

* strumento di responsabilità
* leva organizzativa
* amplificatore di buone (e cattive) pratiche

Ed è per questo che il suo lavoro continua a essere rilevante, anche anni dopo.

## Conclusione

I feature flags sono potenti.
Il DevOps è potente.

E come ricorda implicitamente Gousset:

> *With great power comes great responsibility.*

Questo articolo è un ringraziamento a chi, nel mondo DevOps, continua a spiegare **non solo cosa fare**, ma **come farlo senza illusioni**.
