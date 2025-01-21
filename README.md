# Car Rental Management System  

Un système de gestion de location de voitures comprenant deux espaces : un espace administrateur pour la gestion des véhicules, des clients, et des réservations, et un espace client pour rechercher et réserver des voitures.

---

## Fonctionnalités  

### **Espace Client**  
- Recherche de voitures disponibles.  
- Réservation de voitures.  
- Affichage de l'historique des réservations.  
- Gestion du profil utilisateur.  

### **Espace Administrateur**  
- Gestion des voitures (ajout, modification, suppression).  
- Gestion des réservations.  
- Gestion des utilisateurs (clients).  
- Tableau de bord avec des statistiques (ex : réservations par mois, voitures les plus louées).  

---

## Architecture  

### **Frontend**  
- **Framework** : React  
- **Bibliothèques utilisées** :  
  - Axios (pour les requêtes API).  
  - React Router (pour la navigation).  
  - Tailwind CSS / Material-UI (pour le design).  

### **Backend**  
- **Framework** : Spring Boot  
- **Modules utilisés** :  
  - Spring Data JPA (pour l'accès aux bases de données).  
  - Spring Security (pour l'authentification et l'autorisation).  
  - Hibernate (ORM).  
- **Base de données** : MySQL / PostgreSQL.  

### **Communication entre Frontend et Backend**  
- API REST avec les routes suivantes :  
  - **Clients** : Inscription, connexion, gestion des réservations.  
  - **Admin** : Gestion des voitures, clients, et réservations.  

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
