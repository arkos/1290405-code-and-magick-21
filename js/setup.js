'use strict';

const WIZARD_FIRST_NAMES = [
  `Иван`,
  `Хуан Себастьян`,
  `Мария`,
  `Кристоф`,
  `Виктор`,
  `Юлия`,
  `Люпита`,
  `Вашингтон`,
];

const WIZARD_LAST_NAMES = [
  `да Марья`,
  `Верон`,
  `Мирабелла`,
  `Вальц`,
  `Онопко`,
  `Топольницкая`,
  `Нионго`,
  `Ирвинг`,
];

const WIZARD_COAT_COLORS = [
  `rgb(101, 137, 164)`,
  `rgb(241, 43, 107)`,
  `rgb(146, 100, 161)`,
  `rgb(56, 159, 117)`,
  `rgb(215, 210, 55)`,
  `rgb(0, 0, 0)`,
];

const WIZARD_EYE_COLORS = [
  `black`,
  `red`,
  `blue`,
  `yellow`,
  `green`,
];

const generateItem = (items) => items[window.getRandomInt(items.length - 1)];

const generateFullName = (direction) => {
  const firstName = generateItem(WIZARD_FIRST_NAMES);
  const lastName = generateItem(WIZARD_LAST_NAMES);

  return direction ? `${firstName} ${lastName}` : `${lastName} ${firstName}`;
};

const generateWizard = () => ({
  name: `${generateFullName(window.getRandomInt(1))}`,
  coatColor: generateItem(WIZARD_COAT_COLORS),
  eyesColor: generateItem(WIZARD_EYE_COLORS)
});

const generateSampleWizards = (count) => {
  const sampleWizards = [];
  for (let i = 0; i < count; i++) {
    sampleWizards.push(generateWizard());
  }
  return sampleWizards;
};

const createWizardElement = (wizardTemplate, wizard) => {
  const wizardElement = wizardTemplate.cloneNode(true);

  const wizardName = wizardElement.querySelector(`.setup-similar-label`);
  wizardName.textContent = wizard.name;

  const wizardCoatColor = wizardElement.querySelector(`.wizard-coat`);
  wizardCoatColor.style.fill = wizard.coatColor;

  const wizardEyesColor = wizardElement.querySelector(`.wizard-eyes`);
  wizardEyesColor.style.fill = wizard.eyesColor;

  return wizardElement;
};

const createWizardElements = (wizardTemplate, wizards) => {
  const fragment = document.createDocumentFragment();
  wizards.forEach((wizard) => fragment.appendChild(createWizardElement(wizardTemplate, wizard)));
  return fragment;
};

window.renderSimilarWizards = function () {
  const setup = document.querySelector(`.setup`);
  setup.classList.remove(`hidden`);

  const wizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`);

  const sampleWizards = generateSampleWizards(4);
  const sampleWizardElements = createWizardElements(wizardTemplate, sampleWizards);

  const similarList = document.querySelector(`.setup-similar-list`);
  similarList.appendChild(sampleWizardElements);

  const setupSimilar = document.querySelector(`.setup-similar`);
  setupSimilar.classList.remove(`hidden`);
};

window.renderSimilarWizards();

