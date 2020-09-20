"use strict";

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_TOP_X = 100;
const CLOUD_TOP_Y = 10;
const CLOUD_BOTTOM_Y = CLOUD_TOP_Y + CLOUD_HEIGHT;
const SHADOW_OFFSET = 10;
const CLOUD_MARGIN = 20;

const FONT_GAP = 16;
const TEXT_GAP = 10;
const CANVAS_FONT_SIZE = `${FONT_GAP}px`;
const CANVAS_FONT_FAMILY = `PT Mono`;
const CANVAS_FONT = `${CANVAS_FONT_SIZE} ${CANVAS_FONT_FAMILY}`;

const BAR_WIDTH = 40;
const BAR_GAP = 50;
const BAR_MAX_HEIGHT = 150;

const renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const getMaxElement = function (arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
};

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

window.renderStatistics = function (ctx, players, times) {

  renderCloud(ctx, CLOUD_TOP_X + SHADOW_OFFSET, CLOUD_TOP_Y + SHADOW_OFFSET, `rgba(0, 0, 0, 0.7)`);
  renderCloud(ctx, CLOUD_TOP_X, CLOUD_TOP_Y, `#ffffff`);


  ctx.fillStyle = `#000000`;
  ctx.font = CANVAS_FONT;

  ctx.fillText('Ура вы победили!', CLOUD_TOP_X + CLOUD_MARGIN, CLOUD_TOP_Y + CLOUD_MARGIN + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_TOP_X + CLOUD_MARGIN, CLOUD_TOP_Y + CLOUD_MARGIN + FONT_GAP + TEXT_GAP * 2);


  const maxTime = getMaxElement(times);

  for (let i = 0; i < players.length; i++) {
    const barHeight = (BAR_MAX_HEIGHT * times[i] / maxTime) - CLOUD_MARGIN;
    ctx.fillText(players[i], CLOUD_TOP_X + 2 * CLOUD_MARGIN + ((BAR_WIDTH + BAR_GAP) * i), CLOUD_BOTTOM_Y - CLOUD_MARGIN);
    ctx.fillText(Math.floor(times[i]), CLOUD_TOP_X + 2 * CLOUD_MARGIN + ((BAR_WIDTH + BAR_GAP) * i), CLOUD_BOTTOM_Y - CLOUD_MARGIN - barHeight - TEXT_GAP - FONT_GAP - TEXT_GAP);

    if (players[i] === `Вы`) {
      ctx.fillStyle = `rgba(255, 0, 0, 1)`;
    } else {
      const saturation = getRandomInt(100);
      ctx.fillStyle = `hsl(240, ${saturation}%, 50%)`;
    }

    ctx.fillRect(CLOUD_TOP_X + 2 * CLOUD_MARGIN + (BAR_WIDTH + BAR_GAP) * i, CLOUD_BOTTOM_Y - CLOUD_MARGIN - barHeight - TEXT_GAP - FONT_GAP, BAR_WIDTH, barHeight);
    ctx.fillStyle = `#000000`;
  }
};
