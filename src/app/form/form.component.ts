import { Component, Inject, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { ReponseService } from '../reponse.service';
import { Reponse } from '../reponse';

import { FormBuilder, FormGroup, Validators, NgForm, FormGroupDirective, FormControl } from '@angular/forms';
import {MatDialog, MatDialogConfig} from "@angular/material";
import {DialogComponent} from "../dialog/dialog.component";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  reponse: Reponse;
  reponseFrm: FormGroup;
  reponses: Array<Reponse>;

  profil: string;
  montant: string;

  values = {
    tag: 'renseignement2',
    text: 'Dans le futur, est-ce que l\'un ou plusieurs des événements suivants pourraient affecter votre équilibre budgétaire ET \
  nécessiter l\'utilisation d\'une partie importante de vos investissements plus tôt que prévu ?',
    options: [
        'Des revenus instables',
        'La naissance d\'un enfant',
        'L\'achat d\'une résidence',
        'Un mariage / union',
        'Un divorce / séparation',
        'Une invalidité prolongée',
        'La retraite',
        'Une perte d\'emploi',
        'Des dépenses imprévues en habitation',
        'Des dépenses imprévues de transport',
        'Une santé précaire ou la pratique d\'activité à haut risque'
    ]
    };

  public renseignements = [
    { text: 'Quel est votre âge ?',
      tag: 'renseignement1',
      options: [
        {valeur: 10, text: '30 ans et moins'},
        {valeur: 8, text: '31 à 40 ans'},
        {valeur: 6, text: '41 à 50 ans'},
        {valeur: 4, text: '51 à 65 ans'},
        {valeur: 2, text: 'Plus de 65 ans'},
      ]
    },
    { text: 'Quelle est votre expérience en matière d\'investissement ?',
      tag: 'renseignement3',
      options: [
        {valeur: 2, text: 'Limitée – elle se résume aux produits d\'épargne bancaire classiques'},
        {valeur: 4, text: 'Modérée – j\'ai une expérience des placements réalisés avec un conseiller'},
        {valeur: 6, text: 'Importante - je suis déjà investisseur actif et connais le risque des placements'},
      ]
    }
  ];

  public objectifs = [
    { text: 'A Combien estimez-vous le montant de vos revenus moyens brut ?',
      tag: 'object1',
      options: [
        {valeur: 2, text: 'Moins de 100 000 DH'},
        {valeur: 4, text: 'Entre 100 000 DH et 500 000 DH'},
        {valeur: 6, text: 'Entre 500 000 DH et 1 000 000 DH'},
        {valeur: 8, text: 'Plus de 1 000 000 DH'},
      ]
    },
    { text: 'Quelle est la principale source de votre revenu? ',
      tag: 'object2',
      options: [
        {valeur: 2, text: 'Salaire'},
        {valeur: 2, text: 'Pension alimentaire'},
        {valeur: 4, text: 'Vente de bien'},
        {valeur: 2, text: 'Rentes'},
        {valeur: 2, text: 'Pension d’invalidité '},
        {valeur: 2, text: 'Contrats d’assurances '},
        {valeur: 2, text: 'Epargne personnelle '},
        {valeur: 8, text: 'Revenus mobiliers '},
        {valeur: 2, text: 'Héritage '},
        {valeur: 2, text: 'Retraite'},
        {valeur: 10, text: 'Produits bancaires'},
      ]
    },
    { text: 'Quelle est la répartition de votre patrimoine ?',
      tag: 'object3',
      options: [
        {valeur: 2, text: 'Produits bancaires traditionnels (à revenus fixes) '},
        {valeur: 4, text: 'Revenues immobiliers'},
        {valeur: 6, text: 'Contrats d’assurances '},
        {valeur: 8, text: 'Portefeuille en valeur mobilière '},
      ]
    },
    { text: 'Dans votre politique de profits, optez-vous pour  ?',
    tag: 'object4',
    options: [
      {valeur: 6, text: 'Un réinvestissement des profits réalisés sur le marché'},
      {valeur: 4, text: 'Une orientation des profits vers d’autres placements, en l’occurrence les placements bancaires '},
      {valeur: 2, text: 'Une prise de bénéfices ferme '},
    ]
  },
  { text: 'Parmi les descriptifs suivants, lequel correspond le mieux à votre profil d’investisseur?',
  tag: 'object5',
  options: [
    {valeur: 2, text: 'Prudent : Risque minimal / potentiel de rentabilité faible'},
    {valeur: 4, text: 'Equilibré: Risque modéré/ potentiel de rentabilité moyen'},
    {valeur: 6, text: 'Dynamique: Risque élevé / potentiel de rentabilité élevé '},
    {valeur: 8, text: 'Offensif: Risque très élevé dans un objectif de performance maximale'},
  ]
  },
  { text: 'Quel est votre niveau de connaissances en matière d’investissement sur le marché financier ? ',
  tag: 'object6',
  options: [
    {valeur: 8, text: 'Excellentes'},
    {valeur: 6, text: 'Modérées'},
    {valeur: 4, text: 'Moyennes'},
    {valeur: 2, text: 'Exige un accompagnement'},
  ]
  },
  { text: 'Votre intervention en Bourse sera effectuée ',
  tag: 'object7',
  options: [
    {valeur: 2, text: 'En une fois  '},
    {valeur: 4, text: 'Selon les opportunités du marché'},
    {valeur: 6, text: 'En plusieurs interventions périodiques'},
  ]
  }


];

  public tolerances = [
    { text: 'Quels sont les objectifs de votre investissement en bourse?',
      tag: 'invest1',
      options: [
        {valeur: 6, text: 'Assurer des revenus récurrents '},
        {valeur: 4, text: 'Réalisation de profits à moyen et court terme '},
        {valeur: 2, text: 'Plan d’épargne/retraite '},
      ]
    },
    { text: 'Quel est votre horizon d’investissement en bourse ?',
      tag: 'invest2',
      options: [
        {valeur: 4, text: 'Court terme : moins d’un an '},
        {valeur: 6, text: 'Moyen terme : entre 1 an et 3 ans '},
        {valeur: 8, text: 'Long terme : plus de 3 ans'},
      ]
    },
    { text: 'A priori, quels sont les secteurs des sociétés cotées qui vous intéressent ? ',
      tag: 'invest3',
      options: [
        {valeur: 6, text: 'Immobilier'},
        {valeur: 10, text: 'Assurance'},
        {valeur: 8, text: 'Matériels logiciels et services informations '},
        {valeur: 4, text: 'Télécommunication'},
        {valeur: 2, text: 'Agroalimentaire'},
        {valeur: 4, text: 'Banque'},
      ]
    },
    { text: 'Quels sont les produits financiers qui vous intéressent ? ',
      tag: 'invest4',
      options: [
        {valeur: 8, text: 'Actions'},
        {valeur: 2, text: 'Obligations'},
        {valeur: 6, text: 'OPCVM'},
        {valeur: 4, text: 'Produits Structurés'},
      ]
    },
    { text: 'A combien estimez-vous la rotation de votre portefeuille durant les deux dernières années ?',
      tag: 'invest5',
      options: [
        {valeur: 8, text: 'Moins d’une fois '},
        {valeur: 2, text: '1 à 2 fois'},
        {valeur: 6, text: '2 fois et plus'},
      ]
    },
    { text: 'Avez-vous déjà perdu des sommes significatives durant les deux dernières années ?',
      tag: 'invest6',
      options: [
        {valeur: 10, text: 'oui'},
        {valeur: 0, text: 'non'},
      ]
    },
    { text: 'Etes-vous le bénéficiaire effectif des opérations à exécuter ?',
      tag: 'invest7',
      options: [
        {valeur: 1, text: 'oui'},
        {valeur: 0, text: 'non'},
      ]
    }

  ];

  constructor(private dialog: MatDialog,
    private _reponseService: ReponseService,
    private router: Router,
    private aR: ActivatedRoute,
    private fb: FormBuilder) { }

  ngOnInit() {

    // this._reponseService.getReponses()
    // .subscribe(res => this.reponses = res);

    const opts = {
      'nom' : [null, Validators.compose([Validators.required])],
      'genre' : [null, Validators.compose([Validators.required])],
      'age' : [null, Validators.compose([Validators.required, Validators.min(18)])],
      'etat' : [null, Validators.compose([Validators.required])],
      'emploi' : [null, Validators.compose([Validators.required])],
      'securite' : [1, Validators.compose([Validators.required])],
      // 'renseignement1': [null, Validators.compose([Validators.required])],
      // 'renseignement2': this.fb.array(this.values.options.map(x => !1)),
      // 'renseignement3': [null, Validators.compose([Validators.required])],
      // 'minrendement': [null, Validators.compose([Validators.required, Validators.min(0), Validators.max(100)])],
      // 'maxpert': [null, Validators.compose([Validators.required, Validators.min(0), Validators.max(100)])],
    };

    for (let index = 0; index < this.objectifs.length; index++) {
        opts[this.objectifs[index].tag] =  [null, Validators.compose([Validators.required])];
        // opts[this.tolerances[index].tag] =  [null, Validators.compose([Validators.required])];
    }

    for (let index = 0; index < this.tolerances.length; index++) {
      opts[this.tolerances[index].tag] =  [null, Validators.compose([Validators.required])];
      // opts[this.tolerances[index].tag] =  [null, Validators.compose([Validators.required])];
    }
    this.reponseFrm = this.fb.group(opts);

  }

  openDialog(id) {

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      // disableClose: true,
      autoFocus: true,
      data: {profil: this.profil, montant: this.montant}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.montant = result;
        this._reponseService.update_montant_Reponse({'id': id,'montant': this.montant}).subscribe(upReponse => {});
        this.router.navigate(['/composition'], { queryParams:  {profil: this.profil }, skipLocationChange: true});

      } else{
        this._reponseService.delete_Reponse(id).subscribe(res => console.log(res));
        // this.router.navigateByUrl('/form');
      }

    });

  }
  addReponse(reponse: Reponse) {

      const data = {
        age: 88,
        emploi: "ss",
        etat: "celibataire",
        genre: "male",
        invest1: 4,
        invest2: 4,
        invest3: 2,
        invest4: 8,
        invest5: 8,
        invest6: 10,
        invest7: 1,
        nom: "ss",
        object1: 4,
        object2: 2,
        object3: 4,
        object4: 4,
        object5: 4,
        object6: 6,
        object7: 4,
        securite: 1
      };
      // this._reponseService.insertReponse(reponse)
      this._reponseService.insertReponse(data)
        .subscribe(newReponse => {
          console.log(newReponse);
          // this.reponses.push(newReponse);
          this.profil = newReponse.profil;
          this.openDialog(newReponse._id);
          // this.router.navigate(['/composition'], { queryParams:  {profil: newReponse.profil}, skipLocationChange: true});

          // this.router.navigateByUrl('/');
        });
  }

}
