/**
 * Created by zmark_000 on 29/12/2016.
 */

let carrier = {

    run: function(creep) {

        if (creep.carry.energy == 0)
        {
            let energyStore = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY, {filter: (source) => source.amount >= creep.carryCapacity});

            if (energyStore)
            {
                if (creep.pickup(energyStore) == ERR_NOT_IN_RANGE)
                {
                    if (creep.moveTo(energyStore, {noPathFinding: true}) == ERR_NOT_FOUND)
                    {
                        creep.moveTo(energyStore);
                    }
                }
            }
            else
            {
                energyStore = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (struct) =>  struct.structureType == STRUCTURE_CONTAINER && struct.store.energy > 100});

                if (energyStore)
                {
                    if (creep.withdraw(energyStore, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                    {
                        if (creep.moveTo(energyStore, {noPathFinding: true}) == ERR_NOT_FOUND)
                        {
                            creep.moveTo(energyStore);
                        }
                    }
                }
            }
        }
        else
        {
            // Find place to drop it off. Prioritise spawner, then extension, then containers

            let target;
            let spawner = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (s) => {return s.structureType == STRUCTURE_SPAWN}});

            if (spawner.energy < spawner.energyCapacity)
            {
                target = spawner;
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                {
                    if (creep.moveTo(target, {noPathFinding: true}) == ERR_NOT_FOUND)
                    {
                        creep.moveTo(target);
                    }
                }
                return
            }

            let extension = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (s) => {return s.structureType == STRUCTURE_EXTENSION && s.energy < s.energyCapacity}});

            if (extension)
            {
                if (creep.transfer(extension, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                {
                    if (creep.moveTo(extension, {noPathFinding: true}) == ERR_NOT_FOUND)
                    {
                        creep.moveTo(extension);
                    }
                }
                return
            }

            let tower = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (s) => {return s.structureType == STRUCTURE_TOWER && s.energy < s.energyCapacity}});

            if (tower)
            {
                if (creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                {
                    if (creep.moveTo(tower, {noPathFinding: true}) == ERR_NOT_FOUND)
                    {
                        creep.moveTo(tower);
                    }
                }
                return
            }

            let container = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (s) => {return s.structureType == STRUCTURE_CONTAINER && s.energy < s.energyCapacity}});

            if (container)
            {
                if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                {
                    if (creep.moveTo(container, {noPathFinding: true}) == ERR_NOT_FOUND)
                    {
                        creep.moveTo(container);
                    }
                }
                return
            }
        }
    }
};

module.exports = carrier;