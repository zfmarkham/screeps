/**
 * Created by zmark_000 on 01/01/2017.
 */

let roleHarvester = require('role.harvester');
let roleUpgrader = require('role.upgrader');
let roleBuilder = require('role.builder');
let roleRepairer = require('role.repairer');
let roleCarrier = require('role.carrier');
let roleDefender = require('role.defender');
let roleSieger = require('role.sieger');

module.exports = function() {

    const roles = {
        harvester: roleHarvester,
        upgrader: roleUpgrader,
        repairer: roleRepairer,
        builder: roleBuilder,
        carrier: roleCarrier,
        defender: roleDefender,
        sieger: roleSieger
    };

    Creep.prototype.setDestination = function(pos, posy) {

        if (typeof pos == 'number') {
            this.memory.destination = JSON.stringify({x: pos, y: posy});
        }
        else {
            this.memory.destination = pos;
        }
    };

    Creep.prototype.runRole = function() {

        if (this.memory.destination){
            let dest = JSON.parse(this.memory.destination);
            if (this.moveTo(dest.x, dest.y, {noPathFinding: true, ignoreDestructibleStructures: true}) == ERR_NOT_FOUND)
            {
                this.moveTo(dest.x, dest.y, {ignoreDestructibleStructures: true});
            }
            else console.log(this.moveTo(dest.x, dest.y, {noPathFinding: true, ignoreDestructibleStructures: true}));

            if (this.pos.x == dest.x && this.pos.y == dest.y)
            {
                delete this.memory.destination;
            }

        }
        else {
            if (this.memory.role)
            {
                roles[this.memory.role].run(this);
            }
        }

        if (this.memory.role) Memory.creepTypes[this.memory.role + 's'].push(this);
    }
};