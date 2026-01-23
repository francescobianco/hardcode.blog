---
title: "Service vs Use Case: un problema cognitivo (prima che architetturale)"
description: "La contrapposizione tra *Service* e *Use Case* viene spesso trattata come una questione di architettura, ma e forse banalizzata, vediamo il perchè"
date: 2026-01-23T15:25:39.792Z
tags: ["misc", "swe"]
authors: ["Francesco Bianco"]
giscus: ""
---

> **Disclaimer**
> Questo post è intenzionalmente cervellotico.
> Potrebbe risultare noioso o faticoso da leggere.
> Non perché parli di architettura, ma perché **quando si esce dal perimetro della definizione formale e si entra nel campo empirico–cognitivo della progettazione, le cose diventano inevitabilmente complesse**.
>
> Se stai cercando regole, pattern pronti o diagrammi rassicuranti, questo non è quel post.

## Perché “Service vs Use Case” non è il vero tema

La contrapposizione tra *Service* e *Use Case* viene spesso trattata come una questione di architettura:

* Clean Architecture
* Hexagonal
* Layered vs vertical slice

Ma questa lettura è riduttiva.

La dicotomia **non nasce nel codice**.
Nasce **prima**, nel modo in cui pensiamo e modelliamo un dominio.

Service e Use Case sono solo **tracce visibili di un problema cognitivo più profondo**.

## Modellare un dominio è un atto di copertura

Quando iniziamo a modellare un dominio applicativo, non stiamo descrivendo la realtà.

Stiamo **coprendola**.

Scegliamo:

* cosa rendere visibile
* cosa ignorare
* cosa semplificare
* cosa stabilizzare

Questa copertura serve a ridurre la complessità e permetterci di agire.

Ma ogni copertura crea anche un **recinto cognitivo**:

* un linguaggio
* un perimetro
* un insieme di concetti “leciti”

Ed è dentro questo recinto che, quasi inevitabilmente, nascono i *Service*.

## I Service come recinti del primo modello

`UserService`, `OrderService`, `PaymentService` non nascono per errore.

Nascono perché:

* il primo modello è quasi sempre **entità-centrico**
* serve un punto stabile a cui appendere il comportamento
* abbiamo bisogno di ordine prima ancora che di correttezza

Il Service diventa così **il contenitore del modello iniziale**.

Finché il dominio resta fermo, funziona.

Il problema è che il dominio **non resta mai fermo**.

---

## Quando il recinto diventa una gabbia

Il business cambia.
Le priorità cambiano.
Gli obiettivi cambiano.

Il recinto, invece, tende a restare.

A quel punto:

* nuovi comportamenti vengono forzati in vecchie strutture
* i Service crescono, si deformano, accumulano
* casi d’uso diversi convivono nello stesso spazio concettuale

Il codice smette di rappresentare il dominio.

Inizia a rappresentare **la storia delle decisioni passate**.

## Use Case come unità di razionalità

Un Use Case non è semplicemente “una funzione del sistema”.

È una **unità di razionalità**:

* un’intenzione
* un obiettivo
* una risposta a *perché* il sistema esiste

`RegisterUser`, `ApproveLoan`, `CancelSubscription` non descrivono dati.

Descrivono **azioni con un senso**.

Quando i Use Case vengono piegati per:

* comodità implementativa
* riuso prematuro
* organizzazione del codice

perdono la loro funzione principale: **rendere leggibile il perché del sistema**.

## Dominio modellato vs dominio implementato

C’è un caso ancora più delicato, spesso ignorato.

Quello in cui **non vogliamo implementare il dominio com’è**, ma **come dovrebbe diventare**.

Succede quando:

* il software è un driver di cambiamento
* si introduce un nuovo modo di lavorare
* si forza una riorganizzazione di processi e responsabilità

In questi casi il modello non è descrittivo.

È **prescrittivo**.

E qui i Service diventano pericolosi, perché:

* cristallizzano l’esistente
* rendono costoso il cambiamento
* confondono il presente con il desiderato

I Use Case, invece, possono rappresentare:

* stati futuri
* intenzioni non ancora pienamente realizzate
* traiettorie, non fotografie

## Futuribilità: il dominio come traiettoria

Un dominio sano non è uno stato stabile.

È una **direzione nel tempo**.

La futuribilità non è prevedere il futuro, ma:

* non impedirlo
* non renderlo troppo costoso
* non negarlo a livello concettuale

I Use Case aiutano perché:

* separano il *cosa* dal *come*
* possono cambiare implementazione senza perdere significato
* accettano la transitorietà

I Service, per loro natura, accumulano.

## Conclusione

La vera distinzione non è architetturale.

È cognitiva.

> **I Service modellano ciò che sappiamo.**
> **I Use Case modellano ciò che vogliamo ottenere.**

Il problema nasce quando smettiamo di distinguere le due cose.

E il codice, lentamente, smette di essere uno strumento di pensiero.

Diventa solo una traccia storica.
