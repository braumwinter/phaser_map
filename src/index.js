import {
    STEP_MAP,
    STEP_TREE,

    EXTENSION_PNG,
    EXTENSION_JPG,

    ROAD_PATH,
    ROAD_CROSS_X,
    ROAD_CROSS_T_TO_UP,
    ROAD_CROSS_T_TO_RIGHT,
    ROAD_CROSS_T_TO_DOWN,
    ROAD_CROSS_T_TO_LEFT,
    ROAD_UP_TO_RIGHT,
    ROAD_UP_TO_LEFT,
    ROAD_RIGHT_TO_UP,
    ROAD_RIGHT_TO_DOWN,
    ROAD_DOWN_TO_RIGHT,
    ROAD_DOWN_TO_LEFT,
    ROAD_LEFT_TO_UP,
    ROAD_LEFT_TO_DOWN,
    ROAD_HORIZONTAL,
    ROAD_VERTICAL,

    STREET_PATH,
    STREET_DALLE,
    STREET_GRASS,

    BUILD_PATH,
    BUILD,
    BUILD_GAME,

    TREE_PATH,
    TREE_1,
    TREE_2,

    BOX_PATH,
    BOX,
    BONUS

} from './const.js';

import {
    EXPORT_MY_JSON
} from './json_file.js';

const map = JSON.parse(EXPORT_MY_JSON);

const map_of_lvl = map.map_of_lvl;
const map_of_builds = map.map_of_builds;
const map_of_tree = map.map_of_tree;

const map_width = map_of_lvl[0].length * STEP_MAP;
const map_height = map_of_lvl.length * STEP_MAP;

const config = {
    type: Phaser.AUTO,
    width: map_width,
    height: map_height,

    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },

    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let player;
let cursors;
let build;
let tree;

function preload() {
    this.load.image(ROAD_CROSS_X, ROAD_PATH + ROAD_CROSS_X + EXTENSION_PNG);
    this.load.image(ROAD_CROSS_T_TO_UP, ROAD_PATH + ROAD_CROSS_T_TO_UP + EXTENSION_PNG);
    this.load.image(ROAD_CROSS_T_TO_RIGHT, ROAD_PATH + ROAD_CROSS_T_TO_RIGHT + EXTENSION_PNG);
    this.load.image(ROAD_CROSS_T_TO_DOWN, ROAD_PATH + ROAD_CROSS_T_TO_DOWN + EXTENSION_PNG);
    this.load.image(ROAD_CROSS_T_TO_LEFT, ROAD_PATH + ROAD_CROSS_T_TO_LEFT + EXTENSION_PNG);
    this.load.image(ROAD_UP_TO_RIGHT, ROAD_PATH + ROAD_UP_TO_RIGHT + EXTENSION_PNG);
    this.load.image(ROAD_UP_TO_LEFT, ROAD_PATH + ROAD_UP_TO_LEFT + EXTENSION_PNG);
    this.load.image(ROAD_RIGHT_TO_UP, ROAD_PATH + ROAD_RIGHT_TO_UP + EXTENSION_PNG);
    this.load.image(ROAD_RIGHT_TO_DOWN, ROAD_PATH + ROAD_RIGHT_TO_DOWN + EXTENSION_PNG);
    this.load.image(ROAD_DOWN_TO_RIGHT, ROAD_PATH + ROAD_DOWN_TO_RIGHT + EXTENSION_PNG);
    this.load.image(ROAD_DOWN_TO_LEFT, ROAD_PATH + ROAD_DOWN_TO_LEFT + EXTENSION_PNG);
    this.load.image(ROAD_LEFT_TO_UP, ROAD_PATH + ROAD_LEFT_TO_UP + EXTENSION_PNG);
    this.load.image(ROAD_LEFT_TO_DOWN, ROAD_PATH + ROAD_LEFT_TO_DOWN + EXTENSION_PNG);
    this.load.image(ROAD_HORIZONTAL, ROAD_PATH + ROAD_HORIZONTAL + EXTENSION_PNG);
    this.load.image(ROAD_VERTICAL, ROAD_PATH + ROAD_VERTICAL + EXTENSION_PNG);

    this.load.image(STREET_DALLE, STREET_PATH + STREET_DALLE + EXTENSION_PNG);
    this.load.image(STREET_GRASS, STREET_PATH + STREET_GRASS + EXTENSION_PNG);

    this.load.image(BUILD, BUILD_PATH + BUILD + EXTENSION_PNG);
    this.load.image(BUILD_GAME, BUILD_PATH + BUILD_GAME + EXTENSION_PNG);

    this.load.image(TREE_1, TREE_PATH + TREE_1 + EXTENSION_PNG);
    this.load.image(TREE_2, TREE_PATH + TREE_2 + EXTENSION_PNG);

    this.load.image(BOX, BOX_PATH + BOX + EXTENSION_JPG);
    this.load.image(BONUS, BOX_PATH + BONUS + EXTENSION_JPG);

    this.load.image('human', './assets/human.png');
}

function create() {

    for (const row_index in map_of_lvl) {
        const row = map_of_lvl[row_index];

        for (const column_index in row) {
            const col = row[column_index];
            const coords = [column_index * STEP_MAP, row_index * STEP_MAP];
            this.add.image(...coords, col).setOrigin(0, 0);
        }
    }

    build = this.physics.add.staticGroup();

    for (const row_index in map_of_builds) {
        const row = map_of_builds[row_index];

        for (const column_index in row) {
            const col = row[column_index];

            if (col.length) {
                const coords = [column_index * STEP_MAP, row_index * STEP_MAP];
                build.create(...coords, col).setOrigin(0, 0);
            }
        }
    }

    tree = this.physics.add.staticGroup();

    for (const row_index in map_of_tree) {
        const row = map_of_tree[row_index];
        const coords = [(row[1] * STEP_MAP) + (row[3] * STEP_TREE), (row[0] * STEP_MAP) + (row[2] * STEP_TREE)];
        tree.create(...coords, row[4]).setOrigin(0, 0);
    }

    player = this.physics.add.image(300, 300, 'human').setOrigin(0, 0);
    player.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(player, tree);
    this.physics.add.collider(player, build);
}

function update() {
    if (cursors.left.isDown) {
        player.x -= 5;
    }
    if (cursors.right.isDown) {
        player.x += 5;
    }
    if (cursors.down.isDown) {
        player.y += 5;
    }
    if (cursors.up.isDown) {
        player.y -= 5;
    }
}