const data = [
    {
        title: 'Git Init',
        description: "La commande <b>git init</b> crée un nouveau dépôt dans le répertoire actuel, en préparant les fichiers nécessaires pour le suivi des versions",
        documentation: 'https://git-scm.com/docs/git-init',
        example: 'git init',
        options: [
            {
                value: "--bare",
                description: "Crée un dépôt 'nu' sans espace de travail, utilisé principalement pour héberger des dépôts. Un dépôt nu contient uniquement les fichiers de métadonnées et n'a pas de copie de travail des fichiers."
            },
            {
                value: "--template <chemin>",
                description: "Spécifie un répertoire contenant des modèles de configuration pour initialiser le dépôt. Utilisé pour personnaliser les fichiers de configuration créés lors de l'initialisation."
            },
            {
                value: "--separate-git-dir <chemin>",
                description: "Indique un répertoire différent pour le stockage des métadonnées Git. Le dépôt sera initialisé dans le répertoire courant, mais les fichiers de configuration et les objets Git seront stockés à l'emplacement spécifié."
            },
            {
                value: "--initial-branch <nom_de_branche>",
                description: "Définit le nom de la branche principale initiale du dépôt. Par défaut, la branche principale est appelée 'main' ou 'master', selon la configuration de Git."
            }
        ]
    },
    {
        title: 'Git Clone',
        description: "La commande <b>git clone</b> copie un dépôt distant sur votre machine locale, incluant l'historique complet et toutes les branches. Elle accepte plusieurs paramètres pour personnaliser la copie.",
        documentation: 'https://git-scm.com/docs/git-clone',
        example: "git clone <adresse_du_depot>",
        options: [
            {
                value: "<répertoire>",
                description: "Spécifie le répertoire local dans lequel cloner le dépôt. Si ce paramètre est omis, Git créera un répertoire portant le même nom que le dépôt distant."
            },
            {
                value: "--branch <nom_de_branche>",
                description: "Permet de cloner une branche spécifique du dépôt. Par défaut, Git clone la branche principale."
            },
            {
                value: "--depth <nombre>",
                description: "Crée un clone superficiel du dépôt avec une profondeur d'historique limitée. Utilisé pour réduire le volume de données téléchargées."
            },
            {
                value: "--single-branch",
                description: "Clone uniquement la branche spécifiée, plutôt que l'intégralité de l'historique du dépôt."
            }
        ]
    },
    {
        title: "Git Branch",
        description: "La commande <b>git branch</b> permet de lister, créer, renommer ou supprimer des branches dans un dépôt Git. Les branches sont des pointeurs vers des commits, facilitant le travail sur des fonctionnalités ou des correctifs séparés.",
        documentation: "https://git-scm.com/docs/git-branch",
        example: "git branch <nom_de_branche>",
        options: [
            {
                value: "<nom_de_branche>",
                description: "Crée une nouvelle branche avec le nom spécifié et la pointe vers le commit actuel."
            },
            {
                value: "--list",
                description: "Liste toutes les branches locales dans le dépôt."
            },
            {
                value: "--delete <nom_de_branche>",
                description: "Supprime la branche spécifiée. La branche doit être fusionnée ou non utilisée pour pouvoir être supprimée."
            },
            {
                value: "--rename <ancien_nom> <nouveau_nom>",
                description: "Renomme une branche existante avec le nouveau nom spécifié."
            },
            {
                value: "--set-upstream-to=<branche>",
                description: "Définit la branche distante comme branche parente pour la branche actuelle."
            }
        ]
    },
    {
        title: "Git Add",
        description: "La commande <b>git add</b> ajoute les modifications de fichiers dans l'index de staging, préparant ainsi les fichiers pour le commit. Cette étape est nécessaire pour inclure des changements dans le prochain commit.",
        documentation: "https://git-scm.com/docs/git-add",
        example: "git add <fichier> [<fichier>...]",
        options: [
            {
                value: "<fichier>",
                description: "Ajoute un ou plusieurs fichiers spécifiques à l'index. Les fichiers peuvent être spécifiés individuellement ou avec des jokers."
            },
            {
                value: ".",
                description: "Ajoute tous les fichiers modifiés dans le répertoire courant et ses sous-répertoires à l'index."
            },
            {
                value: "-A",
                description: "Ajoute tous les fichiers modifiés, supprimés et nouveaux à l'index, en incluant les suppressions."
            },
            {
                value: "-u",
                description: "Ajoute les modifications des fichiers déjà suivis, sans inclure les fichiers non suivis."
            }
        ]
    },
    {
        title: "Git Commit",
        description: "La commande <b>git commit</b> enregistre les modifications ajoutées à l'index dans l'historique du dépôt. Chaque commit a un identifiant unique et un message décrivant les modifications apportées.",
        documentation: "https://git-scm.com/docs/git-commit",
        example: "git commit -m \"Message du commit\"",
        options: [
            {
                value: "-m <message>",
                description: "Spécifie le message du commit en ligne de commande, au lieu d'ouvrir un éditeur de texte."
            },
            {
                value: "--amend",
                description: "Modifie le dernier commit avec les changements actuellement dans l'index. Utile pour corriger des erreurs dans le message ou ajouter des modifications oubliées."
            },
            {
                value: "--no-edit",
                description: "Utilisé avec `--amend` pour conserver le message de commit existant sans modification."
            },
            {
                value: "--allow-empty",
                description: "Permet de créer un commit même si aucun changement n'a été ajouté à l'index. Utile pour enregistrer des points de contrôle ou des messages sans modification."
            }
        ]
    },
    {
        title: "Git Push",
        description: "La commande <b>git push</b> envoie les commits locaux vers un dépôt distant. Elle met à jour les branches distantes avec les commits locaux et est utilisée pour partager les modifications avec d'autres utilisateurs ou sauvegarder le travail sur un serveur.",
        documentation: "https://git-scm.com/docs/git-push",
        example: "git push <remote> <branche>",
        options: [
            {
                value: "<remote>",
                description: "Spécifie le nom du dépôt distant vers lequel pousser les modifications. Par exemple, 'origin'."
            },
            {
                value: "<branche>",
                description: "Spécifie la branche locale à pousser vers le dépôt distant. Par exemple, 'main'."
            },
            {
                value: "--force",
                description: "Force la mise à jour de la branche distante même si elle est en désaccord avec la branche locale. Utilisé pour écraser des commits existants."
            },
            {
                value: "--tags",
                description: "Envoie toutes les balises (tags) locales vers le dépôt distant."
            },
            {
                value: "--set-upstream",
                description: "Définit la branche distante comme branche parente pour la branche locale, facilitant ainsi les futures opérations de push et pull."
            }
        ]
    }
]

function render() {
    const container = cardContainer(data);

    return `
        <h2>Commandes de Git</h2>
        <p>Cette page est dédiée aux commandes Git, répertoriant chaque commande avec ses paramètres et son fonctionnement détaillé.</p>
        ${container}
    `;
}