# ParCom - Comparateur de Forfaits Mobiles 📱

Un site web moderne pour comparer les forfaits mobiles des principaux opérateurs français.

## 🌟 Fonctionnalités

- **Comparaison complète** des forfaits de SFR/RED, Orange/Sosh, Bouygues/B&YOU, et Free
- **Filtrage avancé** par opérateur, prix, data, réseau (4G/5G), et type d'engagement
- **Tri personnalisable** par prix, data, opérateur ou nom
- **Design responsive** pour mobile, tablette et desktop
- **Interface intuitive** en français
- **Données actualisées** stockées en JSON

## 🚀 Démarrage Rapide

1. **Cloner le projet**
```bash
git clone <votre-repo>
cd parcom
```

2. **Ouvrir le site**
   - Ouvrez `index.html` dans votre navigateur
   - Ou servez avec un serveur local :
```bash
# Avec Python
python -m http.server 8000

# Avec Node.js (si serve est installé)
npx serve .

# Avec PHP
php -S localhost:8000
```

3. **Visiter** http://localhost:8000

## 📁 Structure du Projet

```
parcom/
├── index.html          # Page principale
├── styles.css          # Styles CSS
├── script.js           # Logique JavaScript
├── plans.json          # Base de données des forfaits
├── README.md           # Documentation
└── copilot-instructions.md
```

## 🔧 Gestion des Données

### Format des Forfaits (plans.json)

Chaque forfait est représenté par un objet JSON avec les propriétés suivantes :

```json
{
  "id": 1,
  "provider": "orange",           // orange, sfr, bouygues, free
  "subBrand": "Orange",          // Orange, Sosh, SFR, RED, etc.
  "name": "Forfait Orange 5G 80Go",
  "price": 24.99,
  "originalPrice": 29.99,        // Prix barré (optionnel)
  "data": "80",                  // "unlimited" ou nombre en Go
  "dataType": "go",              // "go" ou "unlimited"
  "isUnlimited": false,
  "calls": "Illimités",
  "sms": "Illimités",
  "network": "5g",               // "4g" ou "5g"
  "contract": "sans-engagement", // "sans-engagement", "12-mois", "24-mois"
  "features": [
    "80 Go en France métropolitaine",
    "Appels et SMS illimités",
    "5G incluse"
  ],
  "special": false,              // true pour marquer comme "populaire"
  "link": "https://boutique.orange.fr"
}
```

### Ajouter un Nouveau Forfait

1. Ouvrez `plans.json`
2. Ajoutez un nouvel objet dans le tableau
3. Respectez le format ci-dessus
4. Incrémentez l'ID
5. Sauvegardez le fichier

### Mise à Jour des Prix

Les prix peuvent être facilement mis à jour en éditant le fichier `plans.json`. Le site se mettra automatiquement à jour au rechargement.

## 🎨 Personnalisation

### Couleurs des Opérateurs

Les couleurs sont définies dans `styles.css` :

```css
.provider-orange { background: #fed7aa; color: #ea580c; }
.provider-sfr { background: #fecaca; color: #dc2626; }
.provider-bouygues { background: #bfdbfe; color: #2563eb; }
.provider-free { background: #d1fae5; color: #059669; }
```

### Ajouter de Nouveaux Filtres

1. Ajoutez les éléments HTML dans `index.html`
2. Implémentez la logique dans `script.js`
3. Ajoutez les styles dans `styles.css`

## 📱 Responsive Design

Le site s'adapte automatiquement à toutes les tailles d'écran :
- **Desktop** : Filtres à gauche, grille de forfaits à droite
- **Tablette** : Filtres au-dessus, grille adaptée
- **Mobile** : Layout vertical, cartes optimisées

## 🔍 Fonctionnalités Techniques

### Filtrage en Temps Réel
- Filtres combinables (ET logique)
- Mise à jour instantanée des résultats
- Compteur de résultats dynamique

### Performance
- Chargement asynchrone des données
- Filtrage côté client (rapide)
- CSS optimisé avec animations fluides

### Accessibilité
- Labels appropriés pour les filtres
- Contraste respectant les standards
- Navigation au clavier possible

## 🛠️ Technologies Utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Design moderne avec Grid et Flexbox
- **JavaScript ES6+** - Logique interactive
- **JSON** - Stockage des données
- **Google Fonts** - Police Inter

## 📈 Évolutions Possibles

### Court Terme
- [ ] Ajout de plus de forfaits
- [ ] Filtre par data en Europe/DOM
- [ ] Comparaison côte à côte
- [ ] Mode sombre

### Moyen Terme
- [ ] API backend pour les données
- [ ] Historique des prix
- [ ] Alertes de prix
- [ ] Partage de comparaisons

### Long Terme
- [ ] Application mobile
- [ ] Intégration avec les APIs des opérateurs
- [ ] Recommandations personnalisées
- [ ] Système de favoris

## 🤝 Contribution

1. Forkez le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

Si vous rencontrez des problèmes ou avez des questions :
1. Vérifiez les issues existantes
2. Créez une nouvelle issue avec un maximum de détails
3. Incluez les étapes pour reproduire le problème

---

**ParCom** - Trouvez le forfait mobile parfait pour vos besoins ! 🎯