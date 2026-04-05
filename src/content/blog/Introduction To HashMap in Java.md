---
title: "Introduction To HashMap In Java"
date: 2026-04-06
slug: introduction-to-hashmap-in-java
readingTime: 4 min
tags: ["java", "hashmap", "hashmap-demystification", "data-structures"]
heroImage:
    src: "../../images/introduction-to-hashmap-in-java.png"
    alt: "Blog Post Cover Image"
    dimensions:
        width: 1920
        height: 1080
---

Imagine you have a million users on your app in an `ArrayList<User>` or a standard array. If you want to check if a given `User` exists on your app, you would need to **iterate a million times** just to verify the existence of a **single user**. This can cause major performance issues at scale.

Welcome to the first part of the **HashMap Demystification** series. We will begin with understanding the solution to this problem. In the later parts we will dive deep into the internals to prove how exactly this solution works and why its so non-trivial.

A `HashMap` is a data structure in Java which stores key-value pairs just like any other `Map`. It allows you to look up a value **instantly**, in constant time, or O(1).

This kind of performance is ideal for:
- caching
- frequency counting
- or any case where fast data retrieval is required.

## Creating a HashMap

The `Map` and `HashMap` are both part of the `java.util` package. The constructor takes the following optional arguments:
1. `initialCapacity`: creates the map to at least hold this many elements (default: 16).
2. `loadFactor`: maximum size after which `HashMap` will increase its capacity (default: 0.75).

```java
import java.util.Map;
import java.util.HashMap;

// Since HashMap implements the Map interface
Map<String, Integer> frequencies = new HashMap<>();
```

 > The types for key and value are locked at declaration i.e. type of key stays `String` and value stays `Integer` throughout. 
 
## Storing Values
The `put(K key, V value)` method allows for storing key value pairs.

```java
frequencies.put("foo", 3);
frequencies.put("bar", 4);
```

### Overwriting Key Value Pairs
The use of the `put(K key, V value)` method for existing key `K`, would result in an overwrite.

```java
// before: { foo -> 3 }
frequencies.put("foo", 10);
// after: { foo -> 10 }
```

### Return Value
The `put(K key, V value)` returns an object of type `V`. In our example it is an `Integer` type. The return value represents the initial value before an overwrite for an existing key and `null` for a non-existing key.

```java
// before: { foo -> 10 }
Integer initialFreqFoo = frequencies.put("foo", 250) // Value: 10
// after: { foo -> 250 }

// before: { }
Integer initialFreq = frequencies.put("key which doesn't exist", 8); // Value: null
// after: { "key which doesn't exist" -> 8 }
```

### Null Support
`HashMap` allows for storing exactly one `null` key and multiple `null` values.
 
 ```java
frequencies.put(null, 0);
frequencies.put("key with null value", null);
 ```

## Retrieving Values

The `get(K key)` method allows for retrieving values for a key of type `K`. It returns the corresponding value of type `V`. In our case `K` is `String` and `V` is `Integer`.

```java
frequencies.get("foo"); // Value: 250

// `null` is a valid key.
frequencies.get(null); // Value: 0
```

### `null` Return Value
if the `get(K key)` method returns a value of `null`, it can mean either:
1. The key value pair **exists** in the map with **value equal to `null`**.
2. The key does **not** exist in the map.

### Determining Existence of a Key

> 1. How to distinguish between both cases?
> 2. How to know whether the key exists with a `null` value or it simply does not exist?

The solution lies in the `containsKey(K key)` method, it returns a `boolean` to verify the existence of the key in the `HashMap`.

```java
frequencies.containsKey("key with null value"); // Value: true
frequencies.containsKey("non-existing key"); // Value: false
```

We now know how to create a `HashMap` and use it to store and retrieve key-value pairs in constant time, without loops. 

But how does it actually do that? How does it know where the data lives inside your memory without iterating it?

It uses mathematics and a fundamental data structure that you already know about.
