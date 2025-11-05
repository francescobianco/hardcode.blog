---
title: "Dalla teoria ai fatti: Quando i token di accesso diventano il problema, non la soluzione"
description: "Dopo anni di battage mediatico sulla supremazia dei token rispetto alle password tradizionali, la realtà sta finalmente presentando il conto. Siamo tutti vulnerabili, capiamo il perchè"
date: 2025-10-15T12:57:39.617Z
tags: ["devops", "security", "npm"]
authors: ["Francesco Bianco"]
giscus: "NPM"
---

Dopo anni di battage mediatico sulla supremazia dei token rispetto alle password tradizionali, la realtà sta finalmente presentando il conto. Gli attacchi informatici degli ultimi mesi hanno messo a nudo una verità scomoda: **i token non sono altro che super-password**, e come tali sono soggetti agli stessi problemi di gestione e sicurezza, se non peggiori.

## Il Grande Risveglio di npm

L'annuncio di npm di ottobre 2025 rappresenta un punto di svolta significativo. Dopo aver subito pesanti attacchi alla supply chain attraverso token compromessi, l'ecosistema npm sta correndo ai ripari con misure drastiche:

- **Revoca permanente di tutti i token classici** entro novembre
- **Nuovi token granulari limitati a 90 giorni** (con default di soli 7 giorni)
- **Disabilitazione delle nuove configurazioni TOTP 2FA**

La giustificazione ufficiale? "I token compromessi a lunga durata sono una vulnerabilità critica." In altre parole: abbiamo sbagliato tutto.

## Il Paradosso dei Token

Qui sta il punto ironico della situazione: **i token sono tecnicamente più deboli delle password tradizionali**. 

Prendiamo un esempio pratico:
- Una password alfanumerica complessa può contenere lettere maiuscole, minuscole, numeri e simboli speciali: uno spazio di circa 94 caratteri diversi
- Un token esadecimale? Solo 16 simboli (0-9 e a-f)

Certo, i token sono più lunghi, ma la complessità per carattere è drasticamente inferiore. E qui viene il bello: mentre le password le memorizziamo (male, spesso, ma le memorizziamo), **i token li archiviamo in chiaro** in file di configurazione, variabili d'ambiente, pipeline CI/CD.

## La Lezione Che Nessuno Voleva Imparare

Gli attacchi recenti hanno dimostrato che:

1. **I token a lunga durata sono bombe a orologeria**: una volta compromessi, danno accesso illimitato finché qualcuno non se ne accorge
2. **La distribuzione dei token è incontrollabile**: quante copie del tuo token di deploy esistono? Nel repository, nel tuo laptop, nel server CI, nel backup...
3. **La rotazione è teorica**: quanti sviluppatori aggiornano regolarmente i loro token? Esatto.

## Dalla Padella alla Brace

La soluzione di npm? Token ancora più corti (7 giorni di default). Il che significa:

- **Rotazione costante** = più opportunità di errore umano
- **Più token in circolazione** = superficie d'attacco ampliata
- **Complessità gestionale aumentata** = maggiore probabilità di shortcuts pericolosi

In pratica, stiamo sostituendo un problema di sicurezza con un problema di usabilità, che inevitabilmente si tradurrà in nuovi problemi di sicurezza.

## La Verità Scomoda

**Una buona gestione delle password batte sempre una cattiva gestione dei token.**

Una password forte, unica, custodita in un password manager affidabile e protetta da 2FA robusto è più sicura di un ecosistema di token sparsi in decine di file di configurazione, commit di Git (ops!), variabili d'ambiente e documentazione interna.

## Morale della Favola

Non esistono proiettili d'argento nella sicurezza informatica. I token erano stati venduti come la panacea, la soluzione definitiva al "problema delle password". La realtà ci sta dimostrando che:

- **La sicurezza è un processo**, non una tecnologia
- **La complessità è nemica della sicurezza**
- **L'usabilità conta**: soluzioni troppo complicate vengono aggirate

Forse è arrivato il momento di smettere di cercare la soluzione magica e concentrarsi su **pratiche solide di gestione delle credenziali**, qualunque forma assumano. Che siano password, token, certificati o chiavi SSH, il principio rimane lo stesso: minimizzare la superficie d'attacco, limitare la durata, monitorare l'utilizzo, ruotare regolarmente.

E soprattutto: **ammettere quando abbiamo sbagliato**, invece di raddoppiare sulla stessa strategia fallimentare.

---

*P.S.: Se usate token npm nei vostri workflow, avete tempo fino a novembre per migrare. Non dite che non vi avevo avvisato.*
