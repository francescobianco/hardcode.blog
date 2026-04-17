---
title: "Capire Grafana in 5 minuti"
description: "Tutto quello che non ti hanno mai detto (ed avresti voluto sentire)"
date: 2026-04-17T08:43:21.078Z
tags: ["devops", "grafana", "observability"]
authors: ["Francesco Bianco"]
giscus: ""
---

> Tutti usano Grafana.
> Tu sei l’unico che ancora non ha capito come usarlo davvero.
> La situazione sta per ribaltarsi. Buona lettura.

## Tutto quello che non ti hanno mai detto (ed avresti voluto sentire)

Se hai mai provato a usare Grafana e hai pensato *“ok bello… ma a cosa serve davvero?”*, non sei solo.

Il problema non è Grafana.
Il problema è che **ti viene sempre spiegato partendo dallo stack sbagliato**.

---

## Il frame mentale che ti manca

Grafana NON è:

* un database
* un sistema di raccolta dati

Grafana è **una lente sui dati**.

---

## La verità che ti sblocca

Puoi usarlo anche con un CSV.

---

## ⚡ Setup 1-click (copia, incolla, boom)

👉 <a href="#" target="_blank"><b>Apri il terminale, incolla questo e premi invio</b></a>

```bash
mkdir -p grafana-csv-demo/data && cd grafana-csv-demo && \

cat << 'EOF' > docker-compose.yml
services:
  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
  csv-server:
    image: python:3.11-slim
    working_dir: /data
    volumes:
      - ./data:/data
    command: python -m http.server 8080
    ports:
      - "8080:8080"
EOF

cat << 'EOF' > data/metrics.csv
time,value,city
2024-01-01T00:00:00Z,10,Milan
2024-01-01T01:00:00Z,15,Milan
2024-01-01T02:00:00Z,7,Milan
EOF

docker compose up -d
```

---

## Cosa hai appena fatto

Hai creato tutto questo:

```
CSV → HTTP → Grafana → Dashboard
```

Apri:

* [http://localhost:3000](http://localhost:3000)
* user: admin / admin

CSV:

* [http://localhost:8080/metrics.csv](http://localhost:8080/metrics.csv)

---

## Come collegarlo

Installa il plugin **Infinity** dentro Grafana.

Poi:

* Data source → Infinity
* URL → `http://csv-server:8080/metrics.csv`
* Tipo → CSV

Fai un pannello:

* Table → vedi i dati
* Time series → vedi il grafico

---

## Il pattern mentale (questo è tutto Grafana)

```
data source → query → pannello → dashboard
```

Fine.

---

## Perché prima ti sembrava inutile

Perché ti mostravano subito questo:

```
Prometheus + scraping + exporter + config
```

Quando in realtà bastava:

```
dato → grafico
```

---

## Quando usare altro (Prometheus / InfluxDB)

Usa CSV per:

* capire Grafana
* demo
* dati statici

Usa altro quando hai:

* dati live
* storico serio
* alert

---

## Takeaway finale

> Grafana non è dove vivono i dati.
> È dove i dati diventano comprensibili.

Se parti da qui, tutto il resto smette di essere nebuloso.
