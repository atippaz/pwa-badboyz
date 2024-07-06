<template>
  <div class="h-100 w-100">
    <v-container class="h-100">
      <v-row class="h-100" align="center">
        <v-col cols="12">
          <div class="d-flex justify-center">ทีม A</div>
          <div class="d-flex justify-space-between align-center">
            <div
              class="btn red d-flex justify-center align-center"
              @click="minusScoreA"
            >
              <v-icon color="white">mdi-minus</v-icon>
            </div>
            <span class="score">
              {{ scoreA }}
            </span>
            <div
              class="btn green d-flex justify-center align-center"
              @click="scoreA += 1"
            >
              <v-icon color="white">mdi-plus</v-icon>
            </div>
          </div>
        </v-col>
        <v-col cols="12">
          <div
            class="d-flex justify-center"
            style="font-size: 60px; font-weight: bold"
          >
            vs
          </div>
        </v-col>
        <v-col cols="12">
          <div class="d-flex justify-center">ทีม B</div>

          <div class="d-flex justify-space-between align-center">
            <div
              class="btn red d-flex justify-center align-center"
              @click="minusScoreB"
            >
              <v-icon color="white">mdi-minus</v-icon>
            </div>
            <span class="score">
              {{ scoreB }}
            </span>
            <div
              class="btn green d-flex justify-center align-center"
              @click="scoreB += 1"
            >
              <v-icon color="white">mdi-plus</v-icon>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const scoreA = ref(0);
const scoreB = ref(0);
function minusScoreA() {
  if (scoreA.value < 1) {
    alert("คะเเนนไม่สามารถลดได้");
    return;
  }
  if (window.confirm("ต้องการลดคะเเนนของทีม A หรือไม่")) {
    scoreA.value -= 1;
  }
}
function minusScoreB() {
  if (scoreB.value < 1) {
    alert("คะเเนนไม่สามารถลดได้");
    return;
  }
  if (window.confirm("ต้องการลดคะเเนนของทีม B หรือไม่")) {
    scoreB.value -= 1;
  }
}
</script>
<style scoped lang="scss">
.score {
  font-weight: bold;
  font-size: 40px;
}

.btn {
  border-radius: 10px;
  width: 80px;
  height: 150px;
}

.red {
  background-color: red;
}

.green {
  background-color: green;
}
</style>
