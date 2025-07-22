---
title: "PHP cambia licenza: cosa significa davvero e perché è una buona notizia"
description: "Il progetto PHP sta per fare un passo storico: dire addio alla sua licenza attuale – la PHP License e la Zend Engine License – per abbracciare una delle licenze open-source più consolidate, indovinate??"
date: 2025-07-22T13:17:59.188Z
tags: ["php", "license"]
authors: ["Francesco Bianco"]
---

Il progetto PHP sta per fare un passo storico: dire addio alla sua licenza attuale – la PHP License e la Zend Engine License – per abbracciare una delle licenze open-source più consolidate e compatibili: la Modified BSD License.

Il cambiamento, ancora in fase di RFC (Request for Comments), è previsto con PHP 9.0, e rappresenta una semplificazione tanto attesa per tutta la community.

### Perché cambiare la licenza?

Chi ha lavorato abbastanza con PHP sa che la **PHP License**, pur approvata dall'OSI (ma solo in via retroattiva), è sempre stata una creatura un po’ atipica. La **Zend Engine License**, invece, non ha mai ricevuto un riconoscimento ufficiale. Entrambe, inoltre, soffrono di **incompatibilità con la GNU GPL**, creando ostacoli soprattutto in ambienti Linux o per chi vuole combinare codice PHP con software GPL.

Insomma, non si tratta solo di formalità: queste licenze hanno rappresentato per anni un *freno legale* alla piena interoperabilità del codice PHP nel vasto ecosistema open-source.

### Perché proprio la Modified BSD License?

La scelta della **Modified BSD License (o "BSD a 3 clausole")** non è casuale. È:

* approvata dalla **OSI**;
* **compatibile con la GPL**;
* riconosciuta come licenza libera anche dalla **Free Software Foundation**;
* priva di clausole ambigue o troppo specifiche;
* già ben conosciuta e adottata da numerosi altri progetti (come FreeBSD, PostgreSQL, libuv, ecc).

Con questo cambiamento, PHP abbandona le clausole su restrizioni d'uso del nome e condizioni particolari, puntando tutto su **chiarezza, compatibilità e riuso del codice**.

### Nessun impatto sugli sviluppatori

Una preoccupazione comune quando si parla di cambio di licenza è l’impatto retroattivo. Ma qui arriva la parte migliore: **non cambia nulla nei diritti d’uso del codice attuale**. Le nuove regole si applicheranno a partire da PHP 9.0, e saranno semplicemente una forma standardizzata di ciò che già esisteva nei fatti.

In pratica: **meno vincoli legali, stesse libertà pratiche**.

### Un’operazione già ben avviata

Il RFC ha già ricevuto **segnali di approvazione** sia dal PHP Group che da Perforce Software (attuale proprietaria della Zend Engine). Si attende solo un voto interno alla community per ratificare il tutto in via definitiva. Il rilascio della nuova licenza coinciderà con quello di **PHP 9.0** – la cui data però non è ancora stata fissata.

### Conclusione

Con questa mossa, PHP abbandona una delle sue ultime *eccentricità storiche* e si allinea finalmente agli standard legali del mondo open-source moderno. Un passaggio silenzioso per molti, ma strategico per chi contribuisce, distribuisce, integra o crea software libero.

Un piccolo passo per la licenza, un grande passo per la community.
