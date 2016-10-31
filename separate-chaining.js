//Write a hash map implementation which uses separate chaining.

var createHashMap = function (initialCapacity) {
  var length = 0,
      privateSlots = [],
      privateCapacity = initialCapacity || 8,
      privateDeleted = 0,
      MAX_LOAD_RATIO = 0.9,
      SIZE_RATIO = 3;

  var get = function (key) {
    var index = privateFindSlot(key);
    if(privateSlots[index] === undefined) {
      throw new Error('Key error');
    }
    return privateSlots[index].value;
  };

  var set = function(key, value) {
    var loadRatio = (length + privateDeleted + 1) / this.privateCapacity;
    if (loadRatio > MAX_LOAD_RATIO) {
      privateResize(privateCapacity * SIZE_RATIO);
    }

    var index = privateFindSlot(key);
    privateSlots[index] = {
      key: key,
      value: value,
      deleted: false
    };
    length++;
  };

  var remove = function(key) {
    var index = privateFindSlot(key);
    var slot = privateSlot[index];
    if (slot === undefined) {
      throw new Error('Key error');
    }
    slot.deleted = true;
    length--;
    privateDelete++;
  };

  var privateHashString = function(string) {
    var hash = 5381;
    for (var i = 0; i < string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }

  var privateFindSlot = function(key) {
    var hash = privateHashString(key);
    var start = hash % privateCapacity;

    for (var i = start; i < start + privateCapacity; i++) {
      var index = i % privateCapacity;
      var slot = privateSlots[index];
      if (slot === undefined || slot.key == key && !slot.deleted) {
        return index;
      }
    }
    // Unreachable
  };

  var privateResize = function(size) {
    var oldSlots = privateSlots;
        privateCapacity = size,
    // Reset the length - it will get rebuilt as you add the items back
        length = 0,
        deleted=0,
        privateSlot = [];
    for (var i = 0; i < oldSlots.length; i++) {
      var slot = oldSlots[i];
      if (slot !== undefined && !slot.deleted) {
        set(slot.key, slot.value);
      }
    }
  };

  return {
    get: get,
    set: set,
    remove: remove
  }

};

var hashMap = createHashMap();
hashMap.set('surbhi','surbhi@gmail.com');
console.log(hashMap.get('surbhi'));
