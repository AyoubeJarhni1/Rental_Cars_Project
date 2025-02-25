# Car Rental Management System  

Un système de gestion de location de voitures comprenant deux espaces : un espace administrateur pour la gestion des véhicules et profil , et un espace client pour rechercher et réserver des voitures.

---

## Fonctionnalités  

### **Espace Client**  
- Recherche de voitures disponibles.  
- Réservation de voitures.  
- Affichage de l'historique des réservations.  
- Gestion du profil.  

### **Espace Administrateur**  
- Gestion des voitures (ajout, modification, suppression).  
- Tableau de bord avec des statistiques (ex : réservations par mois, voitures les plus louées).  
 - Gestion du profil 
---

## Architecture  

### **Frontend**  
- **Framework** : React  
- **Bibliothèques utilisées** :  
  - Axios (pour les requêtes API).  
  - React Router (pour la navigation).  
  - Tailwind CSS   

### **Backend**  
- **Framework** : Spring Boot  
- **Modules utilisés** :  
  - Spring Data JPA (pour l'accès aux bases de données).  
  - Spring Security (pour l'authentification et l'autorisation).  
  - Hibernate (ORM).  
- **Base de données** : MySQL .  

### **Communication entre Frontend et Backend**  
- API REST avec les routes suivantes :  
  - **Clients** : Inscription, connexion, gestion des réservations.  
  - **Admin** : Gestion des voitures, et de son profil .   

---

## Installation  

### **1. Prérequis**  
- Node.js (v16 ou supérieur).  
- Java (JDK 17 ou supérieur).  
- Maven .  
- MySQL.  

### **2. Configuration du Backend**  
1. Clonez le repository :  
   ```bash
   git clone https://github.com/AyoubeJarhni1/Rental_Cars_Project
   cd Rental_Cars_Project/backendSpring

2. Ouvrir le dossier backend  du projet  dans IntelliJ IDEA ou Eclipse :

IntelliJ IDEA :
Ouvrez IntelliJ et sélectionnez "Open", puis choisissez le dossier backendSpring.
Attendez que Maven télécharge les dépendances.
Eclipse :
Importez le projet en sélectionnant "File" > "Import" > "Existing Maven Projects".
Sélectionnez le dossier backendSpring et cliquez sur Finish.
puis cliquer sur run et choisir tomcat comme serveur si vous ne l'avez pas téléchargez tomcat et le projet av étre démarré 

3. Créer la base de données MySQL :

Ouvrez phpMyAdmin ou mysql Workbench  et exécutez :
CREATE DATABASE rental_cars;
ensuite les tables de base de donnée seront crées automatiquement lorsque le serveur backend va démarrer 

4 . Ouvrir le dossier frontend  du projet dans vscode 
ouvrir terminal puis tappe npm install 
taper npm start pour démarrer le projet va étre lancé dans un navigateur automatiquement 

