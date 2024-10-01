// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// console.log(mockUpStrand());

const pAequorFactory = (organismId, dnaArray) => {
  return {
    specimenNum: organismId,
    dna: dnaArray,
    mutate() {
      const randomIndex = Math.floor(Math.random() * this.dna.length);
      const currentBase = this.dna[randomIndex];
      let newBase = returnRandBase();
      while (currentBase === newBase) {
        newBase = returnRandBase();
      }
      this.dna[randomIndex] = newBase;
      return this.dna;
    },
    compareDNA(targetDna) {
      let matchCount = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === targetDna.dna[i]) {
          matchCount++;
        }
      }
      const specimenPercentage = ((matchCount / this.dna.length) * 100).toFixed(
        2
      );
      console.log(
        `specimen #${this.specimenNum} and specimen #${targetDna.specimenNum} have ${specimenPercentage}% DNA in common`
      );
    },
    willLikelySurvive() {
      let matchCount = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === "C" || this.dna[i] === "G") {
          matchCount++;
        }
      }
      const survivePercentage = ((matchCount / this.dna.length) * 100).toFixed(
        2
      );
      return survivePercentage >= 60;
    },
    complementStrand() {
      const complement = {
        A: "T",
        T: "A",
        C: "G",
        G: "C",
      };
      return this.dna.map((base) => complement[base]);
    },
  };
};

const survivingPAequor = [];
let organismId = 1;

while (survivingPAequor.length < 30) {
  const newPAequor = pAequorFactory(organismId, mockUpStrand());

  if (newPAequor.willLikelySurvive()) {
    survivingPAequor.push(newPAequor);
  }
  organismId++;
}

// const pAequor1 = pAequorFactory(1, mockUpStrand());
// const pAequor2 = pAequorFactory(2, mockUpStrand());
// console.log(`currentDna: ${pAequor.dna},
// afterMutate: ${pAequor.mutate()}`);

// console.log(pAequor1.dna);
// console.log(pAequor2.dna);
// pAequor1.compareDNA(pAequor2);

// console.log(pAequor1.willLikelySurvive());

// Print the array of surviving instances
// console.log(survivingPAequor);

// Print the length of the array to ensure it contains 30 instances
// console.log(`Number of surviving instances: ${survivingPAequor.length}`);
// const pAequor1 = pAequorFactory(1, mockUpStrand());
// console.log(pAequor1.dna);
// console.log(pAequor1.complementStrand());
