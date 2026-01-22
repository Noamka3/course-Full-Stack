const AutoCompleteTrie = require("../src/AutoCompleteTrie");

describe("AutoCompleteTrie", () => {
  let trie;

  beforeEach(() => {
    trie = new AutoCompleteTrie();
  });

  // -------------------------
  // normalize
  // -------------------------
  describe("normalize", () => {
    test("trims and lowercases input", () => {
      expect(trie.normalize("  CaT ")).toBe("cat");
    });

    test("returns empty string for non-string input", () => {
      expect(trie.normalize(null)).toBe("");
      expect(trie.normalize(undefined)).toBe("");
      expect(trie.normalize(123)).toBe("");
      expect(trie.normalize({})).toBe("");
    });

    test("returns empty string for whitespace-only string", () => {
      expect(trie.normalize("   ")).toBe("");
    });
  });

  // -------------------------
  // addWord
  // -------------------------
  describe("addWord", () => {
    test("adds a word and it can be found", () => {
      expect(trie.addWord("cat")).toBe(true);
      expect(trie.findWord("cat")).toBe(true);
    });

    test("is case-insensitive because it normalizes input", () => {
      expect(trie.addWord("CaT")).toBe(true);
      expect(trie.findWord("cat")).toBe(true);
      expect(trie.findWord("CAT")).toBe(true);
    });

    test("returns false for empty or whitespace input", () => {
      expect(trie.addWord("")).toBe(false);
      expect(trie.addWord("   ")).toBe(false);
    });
  });

  // -------------------------
  // getRmainingTree (helper)
  // -------------------------
  describe("getRmainingTree", () => {
    test("returns a node for an existing prefix", () => {
      trie.addWord("card");
      const node = trie.getRmainingTree("car", trie.root);
      expect(node).not.toBeNull();
      expect(node.value).toBe("r"); // node should represent the last char in prefix
    });

    test("returns null for a prefix that does not exist", () => {
      trie.addWord("cat");
      const node = trie.getRmainingTree("cap", trie.root);
      expect(node).toBeNull();
    });

    test("returns the passed node when prefix is empty string", () => {
      const node = trie.getRmainingTree("", trie.root);
      expect(node).toBe(trie.root);
    });
  });

  // -------------------------
  // findWord
  // -------------------------
  describe("findWord", () => {
    test("returns false if word doesn't exist", () => {
      trie.addWord("cat");
      expect(trie.findWord("dog")).toBe(false);
    });

    test("returns false for a prefix that is not endOfWord", () => {
      trie.addWord("card");
      expect(trie.findWord("car")).toBe(false);
    });

    test("returns true for exact word and supports normalization", () => {
      trie.addWord("CarD");
      expect(trie.findWord("card")).toBe(true);
      expect(trie.findWord(" CARD ")).toBe(true);
    });
  });

  // -------------------------
  // predictWords
  // -------------------------
  describe("predictWords", () => {
    test("returns all completions for a prefix (sorted alphabetically)", () => {
      trie.addWord("cat");
      trie.addWord("car");
      trie.addWord("card");
      trie.addWord("care");

      const suggestions = trie.predictWords("ca");
      expect(suggestions).toEqual(["car", "card", "care", "cat"]); // alphabetical
    });

    test("returns empty array when prefix path doesn't exist", () => {
      trie.addWord("cat");
      expect(trie.predictWords("zz")).toEqual([]);
    });

    test("returns empty array for empty/whitespace prefix", () => {
      expect(trie.predictWords("")).toEqual([]);
      expect(trie.predictWords("   ")).toEqual([]);
    });
  });

  // -------------------------
  // _allWordsHelper (helper)
  // -------------------------
  describe("_allWordsHelper", () => {
    test("collects words under a prefix node (strings)", () => {
      trie.addWord("car");
      trie.addWord("card");
      trie.addWord("care");

      const prefixNode = trie.getRmainingTree("car", trie.root);
      const results = [];
      trie._allWordsHelper("car", prefixNode, results);

      // under 'car' there should be car, card, care
      expect(results.sort()).toEqual(["car", "card", "care"].sort());
    });

    test("includes the prefix itself if it's a complete word", () => {
      trie.addWord("run");
      trie.addWord("running");

      const node = trie.getRmainingTree("run", trie.root);
      const results = [];
      trie._allWordsHelper("run", node, results);

      expect(results).toContain("run");
      expect(results).toContain("running");
    });

    test("does not include a prefix that is not endOfWord", () => {
      trie.addWord("card");
      const node = trie.getRmainingTree("car", trie.root); // 'car' exists as path
      const results = [];
      trie._allWordsHelper("car", node, results);

      // should not contain 'car' because it's not endOfWord
      expect(results).not.toContain("car");
      // but should contain 'card'
      expect(results).toContain("card");
    });
  });

  // -------------------------
  // Bonus: UsWord + getfrequency
  // -------------------------
  describe("UsWord + getfrequency (bonus)", () => {
    test("UsWord returns false if word does not exist", () => {
      trie.addWord("cat");
      expect(trie.UsWord("dog")).toBe(false);
    });

    test("getfrequency returns null if word does not exist", () => {
      trie.addWord("cat");
      expect(trie.getfrequency("dog")).toBeNull();
    });

    test("increments frequency for an existing complete word", () => {
      trie.addWord("cat");

      // initial frequency should be 0 (requires TrieNode.frequency initialized to 0)
      expect(trie.getfrequency("cat")).toBe(0);

      expect(trie.UsWord("cat")).toBe(true);
      expect(trie.UsWord("cat")).toBe(true);

      expect(trie.getfrequency("cat")).toBe(2);
    });

    test("cannot use a prefix that is not a complete word", () => {
      trie.addWord("card");
      expect(trie.UsWord("car")).toBe(false);

      // 'car' is not a complete word => null
      expect(trie.getfrequency("car")).toBeNull();
    });
  });

  // -------------------------
  // Integration flow
  // -------------------------
  describe("integration flow", () => {
    test("end-to-end: add -> complete -> use -> frequency still tracked", () => {
      trie.addWord("cat");
      trie.addWord("car");
      trie.addWord("card");

      expect(trie.predictWords("ca")).toEqual(["car", "card", "cat"]);

      expect(trie.getfrequency("cat")).toBe(0);
      trie.UsWord("cat");
      trie.UsWord("cat");
      expect(trie.getfrequency("cat")).toBe(2);

      // predictWords stays alphabetical (your implementation), not by frequency
      expect(trie.predictWords("ca")).toEqual(["car", "card", "cat"]);
    });
  });
});
