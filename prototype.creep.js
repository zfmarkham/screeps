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

    Object.defineProperty(Creep.prototype, 'destination', {
        get: function() {
            return this.memory.destination;
        },
        set: function(value) {
            if (value instanceof RoomPosition)
            {
                this.memory.destination = JSON.stringify(value);
            }
            else if (typeof value === 'string')
            {
                let coords = value.split(',');
                value = new RoomPosition(Number(coords[0]), Number(coords[1]), this.pos.roomName);
                this.memory.destination = JSON.stringify(value);
            }
            else
            {
                delete this.memory.destination;
            }
        }
    });

    Creep.prototype.getEnergy = function() {

        let energyStore = this.pos.findClosestByRange(FIND_STRUCTURES, {filter: (struct) =>  struct.structureType == STRUCTURE_CONTAINER && struct.store.energy > 100});
        
        if (energyStore)
        {
            if (this.withdraw(energyStore, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
            {
                if (this.moveTo(energyStore, {noPathFinding: true}) == ERR_NOT_FOUND)
                {
                    this.moveTo(energyStore);
                }
            }
        }
        else
        {
            energyStore = this.pos.findClosestByRange(FIND_DROPPED_ENERGY, {filter: (source) => source.amount >= this.carryCapacity});
            if (energyStore)
            {
                if (this.pickup(energyStore) == ERR_NOT_IN_RANGE)
                {
                    if (this.moveTo(energyStore, {noPathFinding: true}) == ERR_NOT_FOUND)
                    {
                        this.moveTo(energyStore);
                    }
                }
            }
        }

    };

    Creep.prototype.runRole = function() {

        if (this.destination)
        {
            let dest = JSON.parse(this.destination);
            console.log(`${dest.x}, ${dest.y}, ${dest.roomName}`);

            let pos = new RoomPosition(dest.x, dest.y, dest.roomName);
            if (this.moveTo(pos, {noPathFinding: true, ignoreDestructibleStructures: true}) == ERR_NOT_FOUND)
            {
                this.moveTo(pos, {ignoreDestructibleStructures: true});
            }
            else console.log(this.moveTo(pos, {noPathFinding: true, ignoreDestructibleStructures: true}));

            if (this.pos.roomName == pos.roomName && this.pos.x == dest.x && this.pos.y == dest.y)
            {
                this.destination = undefined;
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