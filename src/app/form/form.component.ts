import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { ReponseService } from '../reponse.service';
import { Reponse } from '../reponse';

import { FormBuilder, FormGroup, Validators, NgForm, FormGroupDirective, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  reponse: Reponse;
  reponseFrm: FormGroup;
  reponses: Array<Reponse>;

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
    { text: 'Quel est votre principal objectif de placement ?',
      tag: 'object1',
      options: [
        {valeur: 2, text: 'Le besoin de compléter mes revenus dès à présent'},
        {valeur: 4, text: 'Le besoin de compléter mes revenus dans le futur'},
        {valeur: 8, text: 'Financer un achat important'},
        {valeur: 10, text: 'Accroitre mon capital long terme'},
        {valeur: 12, text: 'Épargner pour la retraite'},
      ]
    },
    { text: 'Quel est votre actif net, soit la valeur de tous vos biens et propriétés, moins la valeur de toutes vos dettes ?',
      tag: 'object2',
      options: [
        {valeur: 2, text: 'Moins de 4 000 DH'},
        {valeur: 4, text: 'Entre 4 000 DH et 12 000 DH'},
        {valeur: 6, text: 'Entre 12 000 DH et 20 000 DH'},
        {valeur: 8, text: '20 000 DH et plus'},
      ]
    },
    { text: 'Comment décririez-vous votre situation financière actuelle ?',
      tag: 'object3',
      options: [
        {valeur: 2, text: 'Budget déficitaire. Je dépense souvent plus que gagne. J\'accumule les dettes et peine à les rembourser.'},
        {valeur: 4, text: 'Budget déficitaire. Je dépense souvent plus que je gagne. Néanmoins, je rembourse facilement nos dettes.'},
        {valeur: 8, text: 'Budget équilibré. Avec beaucoup d\'efforts, je parviens à dépenser sensiblement la même chose que je gagne.'},
        {valeur: 10, text: 'Budget équilibré. je dépense \
        sensiblement la même chose que je gagne. je pourrais économiser en cas de besoin.'},
        {valeur: 12, text: 'Surplus budgétaire. Je dépense moins que je gagne. J\'accumule des surplus à investir.'},
      ]
    },
    { text: 'Quel est votre horizon de placement ?',
    tag: 'horizon',
    options: [
      {valeur: 2, text: 'Inférieur à un mois'},
      {valeur: 4, text: 'Entre 1 et 3 mois '},
      {valeur: 8, text: 'Entre 3 et 6 mois '},
      {valeur: 10, text: 'Entre 6 mois et 1 ans'},
    ]
  }];

  public tolerances = [
    { text: 'Êtes-vous à l’aise à l’idée de voir votre capital fluctuer et passer par des périodes de baisse ?',
      tag: 'tolerance1',
      options: [
        {valeur: 2, text: 'Non, je n’aimerais pas subir des pertes, je préfère augmenter mon capital petit à petit.'},
        {valeur: 5, text: 'Non, je modifierais mon portefeuille en cas de période de baisse.'},
        {valeur: 10, text: 'Oui, j\'accepterait des baisses et une certaine volatilité, mais je serais tout de même inquiet.'},
        {valeur: 15, text: 'Oui, parce que je sais que les rendements sont intéressants à long terme.'},
      ]
    },
    { text: 'Que feriez-vous si la valeur de vos actions avait fortement baissé ?',
      tag: 'tolerance2',
      options: [
        {valeur: 2, text: 'Je vendrais tout à perte pour éviter d’autres baisses.'},
        {valeur: 5, text: 'Je vendrais une partie de mes actions et garderait l’autre.'},
        {valeur: 10, text: 'Je conserverait toutes mes actions en espérant que leur valeur remonte.'},
        {valeur: 15, text: 'J’achèterais d’autres actions pendant que leur valeur est basse.'},
      ]
    },
    { text: 'En cas de baisse de la valeur de vos investissements, combien de temps seriez-vous prêt à \
    attendre avant que votre portefeuille regagne sa valeur initiale ?',
      tag: 'tolerance3',
      options: [
        {valeur: 2, text: 'Moins de trois mois.'},
        {valeur: 5, text: 'De trois mois à près de six mois.'},
        {valeur: 10, text: 'De six mois à près d\'un an.'},
        {valeur: 15, text: 'D\'un an à près de trois ans.'},
        {valeur: 20, text: 'Plus de 3 ans.'},
      ]
    },
    { text: 'Parmi les énoncés ci-dessous, lequel décrit le mieux votre philosophie de placement ?',
      tag: 'tolerance4',
      options: [
        {valeur: 2, text: 'Je ne peux pas accepter aucune fluctuation du capital.'},
        {valeur: 5, text: 'Je n’accepte que des fluctuations minimales et je préfère investir dans des \
        placements sûrs au rendement plus faible.'},
        {valeur: 10, text: 'Je suis prêt à ce que la valeur de mes placements fluctue afin d’obtenir \
        un rendement global supérieur à long terme.'},
        {valeur: 15, text: 'Ma préoccupation première est d’obtenir un rendement élevé à long terme et \
        il m’importe peu que la valeur de mes placements diminue à court terme.'},
      ]
    }];

  constructor(private _reponseService: ReponseService, private router: Router, private aR: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {

    this._reponseService.getReponses()
    .subscribe(res => this.reponses = res);

    const opts = {
      'nom' : [null, Validators.compose([Validators.required])],
      'genre' : [null, Validators.compose([Validators.required])],
      'age' : [null, Validators.compose([Validators.required, Validators.min(18)])],
      'etat' : [null, Validators.compose([Validators.required])],
      'emploi' : [null, Validators.compose([Validators.required])],
      'securite' : [1, Validators.compose([Validators.required])],
      'renseignement1': [null, Validators.compose([Validators.required])],
      'renseignement2': this.fb.array(this.values.options.map(x => !1)),
      'renseignement3': [null, Validators.compose([Validators.required])],
      'minrendement': [null, Validators.compose([Validators.required, Validators.min(0), Validators.max(100)])],
      'maxpert': [null, Validators.compose([Validators.required, Validators.min(0), Validators.max(100)])],
    };

    for (let index = 0; index < this.objectifs.length; index++) {
        opts[this.objectifs[index].tag] =  [null, Validators.compose([Validators.required])];
        opts[this.tolerances[index].tag] =  [null, Validators.compose([Validators.required])];
    }
    this.reponseFrm = this.fb.group(opts);

  }

  addReponse(reponse: Reponse) {

      this._reponseService.insertReponse(reponse)
        .subscribe(newReponse => {
          this.reponses.push(newReponse);
          this.router.navigateByUrl('/');
        });
  }

}
