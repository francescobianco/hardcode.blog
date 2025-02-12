---
title: "Come Usare NoMachine su una Macchina Ubuntu in Modalità Headless"
description: "NoMachine è uno strumento potente per accedere in remoto a un desktop Linux. In modalità **headless** (senza monitor fisico collegato)"
date: 2024-11-15T10:50:20.749Z
tags: ["tag1", "tag2"]
authors: ["Francesco Bianco"]
---

NoMachine è uno strumento potente per accedere in remoto a un desktop Linux. In modalità **headless** (senza monitor fisico collegato), potrebbe essere necessario configurare alcune opzioni per garantire che NoMachine funzioni correttamente e mostri un desktop remoto utilizzabile. In questa guida, vedremo come configurare NoMachine su una macchina Ubuntu senza monitor fisico collegato.

---

#### **1. Installare NoMachine su Ubuntu**
1. Scarica NoMachine dal [sito ufficiale](https://www.nomachine.com).
   - Scegli la versione per Linux (deb package per distribuzioni basate su Debian come Ubuntu).
2. Installa il pacchetto scaricato:
   ```bash
   sudo dpkg -i nomachine_*.deb
   ```
3. Risolvi eventuali dipendenze mancanti:
   ```bash
   sudo apt-get install -f
   ```

---

#### **2. Configurare un Display Virtuale (X Server Virtuale)**

Quando una macchina è in modalità headless, spesso non viene avviato un server grafico (X server) perché non ci sono monitor fisici collegati. Per risolvere questo problema, utilizzeremo un driver virtuale come **`xserver-xorg-video-dummy`**.

1. **Installa i pacchetti necessari:**
   ```bash
   sudo apt-get install xserver-xorg-core xserver-xorg-video-dummy
   ```

2. **Configura il file `xorg.conf`:**
   Crea o modifica il file di configurazione per il driver dummy:
   ```bash
   sudo nano /etc/X11/xorg.conf
   ```
   Inserisci il seguente contenuto:

   ```plaintext
   Section "Device"
       Identifier  "Configured Video Device"
       Driver      "dummy"
   EndSection

   Section "Monitor"
       Identifier  "Configured Monitor"
       HorizSync   28-80
       VertRefresh 48-75
   EndSection

   Section "Screen"
       Identifier "Default Screen"
       Monitor    "Configured Monitor"
       Device     "Configured Video Device"
       DefaultDepth 24
       SubSection "Display"
           Depth 24
           Modes "1920x1080"
       EndSubSection
   EndSection
   ```

   Questo configura un display virtuale con risoluzione **1920x1080**. Puoi modificarlo in base alle tue esigenze.

3. **Riavvia il server grafico:**
   Se il sistema non ha un display manager (come GDM o LightDM), avvia manualmente il server X:
   ```bash
   startx
   ```

---

#### **3. Configurare NoMachine**

1. Accedi al pannello di amministrazione di NoMachine. Di solito è disponibile tramite il client NoMachine o accedendo localmente al file di configurazione.

2. **Controlla il servizio:**
   Assicurati che il servizio di NoMachine sia attivo:
   ```bash
   sudo systemctl status nxserver
   ```

3. **Modifica il file di configurazione:**
   Se necessario, puoi personalizzare il comportamento di NoMachine modificando il file:
   ```bash
   sudo nano /usr/NX/etc/server.cfg
   ```

   Cerca le opzioni legate all'uso del desktop virtuale e assicurati che siano abilitate:
   ```plaintext
   EnableDisplayServer 1
   ```

4. **Riavvia il servizio NoMachine:**
   Dopo le modifiche, riavvia NoMachine:
   ```bash
   sudo systemctl restart nxserver
   ```

---

#### **4. Collegarsi alla Macchina Headless**

1. Avvia il client NoMachine sul tuo computer.
2. Inserisci l'indirizzo IP o il nome host della macchina Ubuntu.
3. Accedi con le credenziali dell'utente configurato.

Dovresti vedere il desktop virtuale configurato con il driver `dummy`.

---

#### **5. Risolvere Problemi Comuni**

- **Schermo Nero o Desktop Non Disponibile:**
  - Verifica che il server grafico sia attivo:
    ```bash
    ps aux | grep X
    ```
  - Assicurati che il file `xorg.conf` sia configurato correttamente.

- **Risoluzione Errata:**
  - Modifica la sezione `Modes` in `/etc/X11/xorg.conf` per specificare la risoluzione desiderata.

- **Firewall:**
  - Verifica che le porte di NoMachine (generalmente la porta **4000**) siano aperte:
    ```bash
    sudo ufw allow 4000/tcp

    ```

Altri comandi utili

```
# Re-installare gnome se risultasse corrotto
apt install --reinstall ubuntu-desktop gnome-shell
```

IMPORTANTE! Seguire l'opzione #2 in questo link: https://kb.nomachine.com/AR04R01083

---

#### **Conclusione**

Configurare NoMachine in modalità headless su Ubuntu richiede solo qualche passo aggiuntivo rispetto a una configurazione standard. Utilizzando un driver grafico virtuale, puoi garantire che il desktop remoto sia sempre disponibile e funzionale, anche senza un monitor fisico collegato. Questo setup è ideale per server domestici o macchine dedicate a specifici task remoti.
