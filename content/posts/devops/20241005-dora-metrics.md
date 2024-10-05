---
title: "Le metriche DORA: La chiave per misurare e migliorare le prestazioni DevOps"
description: "Nell'ambito dell'ingegneria del software e del DevOps, la misurazione delle prestazioni è fondamentale per il miglioramento continuo. Le metriche DORA sono emerse come uno standard de facto, scopriamole assieme"
date: 2024-10-05T08:13:47.224Z
tags: ["devops", "metrics"]
authors: ["Francesco Bianco"]
---

Nell'ambito dell'ingegneria del software e del DevOps, la misurazione delle prestazioni è fondamentale per il miglioramento continuo. Le metriche DORA (DevOps Research and Assessment) sono emerse come uno standard de facto per valutare l'efficacia delle pratiche DevOps. In questo articolo, esploreremo cosa sono le metriche DORA, perché sono importanti e come possono essere utilizzate per ottimizzare i processi di sviluppo software.

## Cosa sono le metriche DORA?

Le metriche DORA sono un insieme di quattro indicatori chiave di prestazione (KPI) sviluppati dal team di ricerca DevOps di Google. Queste metriche forniscono una visione olistica delle prestazioni di un'organizzazione in termini di velocità e stabilità del delivery software:

1. Frequenza di distribuzione (Deployment Frequency)
2. Tempo di lead per le modifiche (Lead Time for Changes)
3. Tempo medio di ripristino (Mean Time to Recover - MTTR)
4. Tasso di fallimento delle modifiche (Change Failure Rate)

## Perché le metriche DORA sono importanti?

Le metriche DORA offrono diversi vantaggi:

- **Benchmarking**: Permettono alle organizzazioni di confrontare le proprie prestazioni con quelle del settore.
- **Identificazione delle aree di miglioramento**: Evidenziano i punti deboli nel processo di delivery.
- **Monitoraggio dei progressi**: Consentono di tracciare i miglioramenti nel tempo.
- **Allineamento degli obiettivi**: Forniscono un linguaggio comune per discutere le prestazioni tra team diversi.

## Le quattro metriche DORA in dettaglio (con esempi pratici)

### 1. Frequenza di distribuzione

Misura quanto spesso un'organizzazione distribuisce il codice in produzione. Una frequenza più alta indica una maggiore agilità e capacità di rispondere rapidamente alle esigenze del mercato.

**Esempio pratico con GitLab:**
Per calcolare questa metrica, possiamo contare il numero di deployment riusciti in un determinato periodo di tempo. In GitLab, possiamo utilizzare l'API per ottenere questi dati.

```bash
#!/bin/bash

# Impostare le variabili
GITLAB_TOKEN="your_gitlab_token"
PROJECT_ID="your_project_id"
START_DATE="2024-01-01"
END_DATE="2024-03-31"

# Chiamata API per ottenere i deployment
DEPLOYMENTS=$(curl --header "PRIVATE-TOKEN: $GITLAB_TOKEN" \
  "https://gitlab.com/api/v4/projects/$PROJECT_ID/deployments?status=success&created_after=$START_DATE&created_before=$END_DATE")

# Contare i deployment
DEPLOYMENT_COUNT=$(echo $DEPLOYMENTS | jq length)

# Calcolare la frequenza (assumendo un periodo di 90 giorni)
FREQUENCY=$(echo "scale=2; $DEPLOYMENT_COUNT / 90" | bc)

echo "Frequenza di distribuzione: $FREQUENCY deployments al giorno"
```

### 2. Tempo di lead per le modifiche

Rappresenta il tempo che intercorre tra il commit del codice e la sua distribuzione in produzione. Un tempo di lead più breve indica una pipeline di delivery più efficiente.

**Esempio pratico con GitLab:**
Per questa metrica, dobbiamo misurare il tempo tra l'ultimo commit e il deployment riuscito.

```bash
#!/bin/bash

# Impostare le variabili
GITLAB_TOKEN="your_gitlab_token"
PROJECT_ID="your_project_id"

# Ottenere l'ultimo deployment riuscito
LAST_DEPLOYMENT=$(curl --header "PRIVATE-TOKEN: $GITLAB_TOKEN" \
  "https://gitlab.com/api/v4/projects/$PROJECT_ID/deployments?status=success&order_by=created_at&sort=desc&per_page=1")

DEPLOYMENT_ID=$(echo $LAST_DEPLOYMENT | jq '.[0].id')
DEPLOYMENT_TIME=$(echo $LAST_DEPLOYMENT | jq -r '.[0].created_at')

# Ottenere l'ultimo commit prima del deployment
LAST_COMMIT=$(curl --header "PRIVATE-TOKEN: $GITLAB_TOKEN" \
  "https://gitlab.com/api/v4/projects/$PROJECT_ID/repository/commits?until=$DEPLOYMENT_TIME&per_page=1")

COMMIT_TIME=$(echo $LAST_COMMIT | jq -r '.[0].created_at')

# Calcolare la differenza in minuti
LEAD_TIME=$(( ($(date -d "$DEPLOYMENT_TIME" +%s) - $(date -d "$COMMIT_TIME" +%s)) / 60 ))

echo "Tempo di lead per le modifiche: $LEAD_TIME minuti"
```

### 3. Tempo medio di ripristino (MTTR)

Misura quanto tempo ci vuole per ripristinare il servizio dopo un'interruzione o un incidente. Un MTTR più basso indica una maggiore resilienza e capacità di gestione delle crisi.

**Esempio pratico:**
Per questa metrica, assumiamo di avere un sistema di monitoraggio che registra gli incidenti e i tempi di risoluzione.

```bash
#!/bin/bash

# Impostare le variabili
MONITORING_API="your_monitoring_api_endpoint"
API_TOKEN="your_api_token"
START_DATE="2024-01-01"
END_DATE="2024-03-31"

# Ottenere gli incidenti e i tempi di risoluzione
INCIDENTS=$(curl --header "Authorization: Bearer $API_TOKEN" \
  "$MONITORING_API/incidents?start=$START_DATE&end=$END_DATE")

# Calcolare il MTTR (assumendo che l'API restituisca un array di tempi di risoluzione in minuti)
TOTAL_TIME=$(echo $INCIDENTS | jq '[.[] | .resolution_time] | add')
INCIDENT_COUNT=$(echo $INCIDENTS | jq length)
MTTR=$(echo "scale=2; $TOTAL_TIME / $INCIDENT_COUNT" | bc)

echo "Tempo medio di ripristino (MTTR): $MTTR minuti"
```

### 4. Tasso di fallimento delle modifiche

Rappresenta la percentuale di modifiche che portano a un degrado del servizio o richiedono una correzione immediata. Un tasso più basso indica una maggiore stabilità e qualità del codice.

**Esempio pratico con GitLab:**
Per questa metrica, conteremo i deployment falliti rispetto al totale dei deployment.

```bash
#!/bin/bash

# Impostare le variabili
GITLAB_TOKEN="your_gitlab_token"
PROJECT_ID="your_project_id"
START_DATE="2024-01-01"
END_DATE="2024-03-31"

# Ottenere tutti i deployment
ALL_DEPLOYMENTS=$(curl --header "PRIVATE-TOKEN: $GITLAB_TOKEN" \
  "https://gitlab.com/api/v4/projects/$PROJECT_ID/deployments?created_after=$START_DATE&created_before=$END_DATE")

TOTAL_DEPLOYMENTS=$(echo $ALL_DEPLOYMENTS | jq length)

# Ottenere i deployment falliti
FAILED_DEPLOYMENTS=$(echo $ALL_DEPLOYMENTS | jq '[.[] | select(.status=="failed")] | length')

# Calcolare il tasso di fallimento
FAILURE_RATE=$(echo "scale=2; ($FAILED_DEPLOYMENTS / $TOTAL_DEPLOYMENTS) * 100" | bc)

echo "Tasso di fallimento delle modifiche: $FAILURE_RATE%"
```

## Come implementare le metriche DORA

Per implementare efficacemente le metriche DORA:

1. **Automatizzare la raccolta dei dati**: Utilizzare strumenti di CI/CD e monitoraggio per raccogliere automaticamente i dati necessari. Gli script forniti sopra possono essere un buon punto di partenza.

2. **Stabilire una baseline**: Misurare le prestazioni attuali come punto di partenza. Eseguite gli script per un periodo di tempo significativo (ad esempio, un mese) per ottenere una baseline affidabile.

3. **Fissare obiettivi**: Definire target realistici per ciascuna metrica. Ad esempio, potreste mirare a ridurre il tempo di lead del 20% nei prossimi tre mesi.

4. **Revisione regolare**: Analizzare periodicamente i dati e adattare le strategie di conseguenza. Considerate di creare un dashboard per visualizzare le metriche nel tempo.

5. **Cultura del miglioramento continuo**: Incoraggiare i team a utilizzare questi dati per guidare il miglioramento. Celebrate i successi e affrontate le sfide come opportunità di apprendimento.

## Integrazione con GitLab CI/CD

Per integrare questi script nel vostro pipeline GitLab CI/CD, potete creare un job specifico per il calcolo delle metriche DORA. Ecco un esempio di come potrebbe apparire nel vostro file `.gitlab-ci.yml`:

```yaml
calculate_dora_metrics:
  stage: metrics
  script:
    - chmod +x ./calculate_deployment_frequency.sh
    - chmod +x ./calculate_lead_time.sh
    - chmod +x ./calculate_mttr.sh
    - chmod +x ./calculate_change_failure_rate.sh
    - ./calculate_deployment_frequency.sh
    - ./calculate_lead_time.sh
    - ./calculate_mttr.sh
    - ./calculate_change_failure_rate.sh
  artifacts:
    reports:
      metrics: metrics.txt
  only:
    - schedules
```

Questo job eseguirà gli script per calcolare le metriche DORA e salverà i risultati come artefatti del pipeline. Potete programmarlo per essere eseguito periodicamente (ad esempio, settimanalmente o mensilmente) utilizzando le pipeline schedulate di GitLab.

## Conclusione

Le metriche DORA offrono un framework potente per misurare e migliorare le prestazioni DevOps. Implementandole correttamente, le organizzazioni possono accelerare il loro percorso verso l'eccellenza operativa, migliorando sia la velocità che la stabilità del loro processo di delivery software. 

Gli esempi pratici e gli script forniti in questo articolo vi danno un punto di partenza concreto per iniziare a tracciare queste metriche nel vostro ambiente GitLab. Tuttavia, ricordate che l'obiettivo non è solo migliorare i numeri, ma utilizzare questi dati per guidare un miglioramento reale e tangibile nella vostra capacità di fornire valore ai clienti attraverso il software.

Mentre implementate queste metriche, mantenete sempre una visione olistica del vostro processo di sviluppo. Le metriche DORA sono potenti, ma sono solo una parte del quadro complessivo. Combinate queste metriche con altri indicatori rilevanti per il vostro business e, soprattutto, ascoltate il feedback del vostro team e dei vostri clienti.

Con il tempo e la dedizione, l'uso delle metriche DORA può portare a un significativo miglioramento delle prestazioni DevOps, risultando in rilasci più frequenti, tempi di sviluppo più brevi, sistemi più stabili e, in definitiva, clienti più soddisfatti.


