"use strict";

// Constants definition

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_TOP_X = 100;
const CLOUD_TOP_Y = 10;
const CLOUD_BOTTOM_Y = CLOUD_TOP_Y + CLOUD_HEIGHT;
const CLOUD_FILL_STYLE = `#ffffff`;
const CLOUD_MARGIN = 20;

const SHADOW_OFFSET = 10;
const SHADOW_FILL_STYLE = `rgba(0, 0, 0, 0.7)`;

const FONT_GAP = 16;
const TEXT_GAP = 10;
const CANVAS_FONT_SIZE = `${FONT_GAP}px`;
const CANVAS_FONT_FAMILY = `PT Mono`;
const CANVAS_FONT = `${CANVAS_FONT_SIZE} ${CANVAS_FONT_FAMILY}`;
const TEXT_ALTERNATE = `Вы`;
const TEXT_WINNER_MESSAGE = `Ура вы победили!`;
const TEXT_RESULTS_MESSAGE = `Список результатов:`;

const BAR_PRIMARY_FILL_STYLE = `#000000`;
const BAR_SECONDARY_FILL_STYLE = `rgba(255, 0, 0, 1)`;
const BAR_ALTERNATE_FILL_STYLE_HUE = 240;
const BAR_ALTERNATE_FILL_STYLE_LIGHTNESS = 50;
const BAR_WIDTH = 40;
const BAR_GAP = 50;
const BAR_MAX_HEIGHT = 150;

// Helper functions

const renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const getMaxElement = (elements) => elements.reduce((max, current) => max < current ? current : max, elements[0]);

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

// Histogram rendering

const renderBar = function (ctx, barHeight, label, value, index) {
  const labelX = CLOUD_TOP_X + 2 * CLOUD_MARGIN + ((BAR_WIDTH + BAR_GAP) * index);
  const labelY = CLOUD_BOTTOM_Y - CLOUD_MARGIN;

  ctx.fillText(label, labelX, labelY);

  const valueX = CLOUD_TOP_X + 2 * CLOUD_MARGIN + ((BAR_WIDTH + BAR_GAP) * index);
  const valueY = CLOUD_BOTTOM_Y - CLOUD_MARGIN - barHeight - TEXT_GAP - FONT_GAP - TEXT_GAP;

  ctx.fillText(Math.floor(value), valueX, valueY);

  ctx.fillStyle = (label === TEXT_ALTERNATE) ? BAR_SECONDARY_FILL_STYLE : `hsl(${BAR_ALTERNATE_FILL_STYLE_HUE},
    ${getRandomInt(100)}%,
    ${BAR_ALTERNATE_FILL_STYLE_LIGHTNESS}%)`;

  const barX = CLOUD_TOP_X + 2 * CLOUD_MARGIN + (BAR_WIDTH + BAR_GAP) * index;
  const barY = CLOUD_BOTTOM_Y - CLOUD_MARGIN - barHeight - TEXT_GAP - FONT_GAP;

  ctx.fillRect(barX, barY, BAR_WIDTH, barHeight);
  ctx.fillStyle = BAR_PRIMARY_FILL_STYLE;
};

const renderHistogram = function (ctx, labels, values) {

  const max = getMaxElement(values);

  for (let i = 0; i < labels.length; i++) {
    const barHeight = (BAR_MAX_HEIGHT * values[i] / max) - CLOUD_MARGIN;
    renderBar(ctx, barHeight, labels[i], values[i], i);
  }
};

// Statistics rendering

const showCompletionMessage = function (ctx) {
  ctx.fillText(TEXT_WINNER_MESSAGE, CLOUD_TOP_X + CLOUD_MARGIN, CLOUD_TOP_Y + CLOUD_MARGIN + FONT_GAP);
  ctx.fillText(TEXT_RESULTS_MESSAGE, CLOUD_TOP_X + CLOUD_MARGIN, CLOUD_TOP_Y + CLOUD_MARGIN + FONT_GAP + TEXT_GAP * 2);
};

window.renderStatistics = function (ctx, players, times) {

  renderCloud(ctx, CLOUD_TOP_X + SHADOW_OFFSET, CLOUD_TOP_Y + SHADOW_OFFSET, SHADOW_FILL_STYLE);
  renderCloud(ctx, CLOUD_TOP_X, CLOUD_TOP_Y, CLOUD_FILL_STYLE);

  ctx.fillStyle = BAR_PRIMARY_FILL_STYLE;
  ctx.font = CANVAS_FONT;

  showCompletionMessage(ctx);

  renderHistogram(ctx, players, times);
};
