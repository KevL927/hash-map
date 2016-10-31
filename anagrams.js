// Write an algorithm to check whether any permutation of a string is a palindrome (a string which reads the same forwards and backwards). For example, "madam", "amadm" and "cllci" should all return true, whereas "caabl" and "aaxxis" should return false.

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
      return undefined;
      // throw new Error('Key error');
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
    remove: remove,
    fetchPrivate: function() {return privateSlots}
  };

};

var hashMap = createHashMap();


var Key = function(string){
	return string.split('').sort().join('');
}

var anagrams = function(array) {
  for(var i = 0; i < array.length; i++) {
    if(hashMap.get(Key(array[i])) !== undefined) {

      hashMap.set(Key(array[i]), hashMap.get(Key(array[i])).concat(array[i]));

    } else {
      hashMap.set(Key(array[i]),[array[i]]);
    }
    
  }
// console.log(hashMap.fetchPrivate())
}

anagrams(['east', 'cars', 'acre', 'arcs','eats', 'teas',  'race']);

function displayAnagram(){
	var a=[];
	var arr=hashMap.fetchPrivate();
	for(var i=0;i<arr.length;i++){
		if(arr[i] !==  undefined){
			a.push(arr[i].value);
		}	
	}
	return a;
}

console.log(displayAnagram());