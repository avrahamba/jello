<template>
  <section class="mini-modal">
    <h3>Due Date</h3>
    <div class="calendar">
      <input
        class="input-date"
        type="text"
        v-model="date"
        @focus="focus()"
        @blur="blur()"
        placeholder="Pick a date"
      />
      <div class="calendar-layout" v-if="active" @mousedown.prevent>
        <div class="calendar-header">
          <div class="row">
            <span @click="setPreviousMonth()">
              <i class="material-icons fas fa-chevron-left"></i>
            </span>
            <div class="calendar-title">{{ monthYearFormatted }}</div>
            <span @click="setNextMonth()">
              <i class="material-icons fas fa-chevron-right"></i>
            </span>
          </div>
          <div class="calendar-days">
            <div class="day" v-for="day in days" :key="day">{{ day | trimThreeChar }}</div>
          </div>
        </div>
        <div class="calendar-body">
          <div
            class="calendar-row"
            v-bind:class="{ 'swipe-left': swipeLeft, 'swipe-right': swipeRight }"
            v-for="(row, index) in calendarDays"
            :key="index"
          >
            <div
              class="calendar-day"
              :class="{disabled: isDisabled(cell), selected: isSelected(cell)}"
              v-bind:style="{height: cellHeightUnit}"
              v-for="(cell, index) in row"
              :key="index"
              @click="selectDay(cell)"
            >{{ cell.day }}</div>
          </div>
        </div>
        <div class="calendar-footer"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    date: "",
    activeDate: "201901",
    activeDay: "",
    active: false,
    days: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    monthes: {
      "01": "January",
      "02": "February",
      "03": "March",
      "04": "April",
      "05": "May",
      "06": "June",
      "07": "July",
      "08": "August",
      "09": "September",
      "10": "October",
      "11": "November",
      "12": "December"
    },
    calendarDays: [],
    cellHeight: "",
    swipeLeft: false,
    swipeRight: false
  }),
  filters: {
    trimThreeChar(item) {
      return item.substr(0, 3);
    }
  },
  computed: {
    monthYearFormatted() {
      // Returns the current month name followed by the current year
      return (
        this.monthes[this.activeDate.substr(4, 2)] +
        " " +
        this.activeDate.substr(0, 4)
      );
    },
    cellHeightUnit() {
      return this.cellHeight + "px";
    }
  },
  methods: {
    focus() {
      this.active = true;
      this.cellHeight = this.$el.querySelector("input").offsetWidth / 7;
    },
    blur() {
      this.active = false;
    },
    getCurrentDate() {
      // Returns today's date with format YYYY/MM/DD
      return new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "/");
    },
    getCurrentDay() {
      // Returns current day within range 1-31
      return new Date().getDate();
    },
    getCurrentMonth() {
      // Returns the current month as a 2 digits number
      return ("0" + (new Date().getMonth() + 1)).slice(-2);
    },
    getPreviousMonth(month) {
      if (parseInt(month) == 1) return "12";
      else return ("0" + (parseInt(month) - 1)).slice(-2);
    },
    getNextMonth(month) {
      if (parseInt(month) == 12) return "01";
      else return ("0" + (parseInt(month) + 1)).slice(-2);
    },
    getCurrentYear() {
      // Returns the current year as a 4 digits number
      return new Date().getFullYear();
    },
    getNumberOfDaysInMonth(year, month) {
      return new Date(year, month, 0).getDate();
    },
    getNumberOfDaysInPreviousMonth(year, month) {
      if (month == "01")
        return new Date(year - 1, this.getPreviousMonth(month), 0).getDate();
      else return new Date(year, this.getPreviousMonth(month), 0).getDate();
    },
    getNumberOfDaysInNextMonth() {
      if (this.getNextMonth() == "12")
        return new Date(
          this.getCurrentYear() + 1,
          this.getNextMonth(),
          0
        ).getDate();
      else
        return new Date(
          this.getCurrentYear(),
          this.getNextMonth(),
          0
        ).getDate();
    },
    getFirstDayOfMonth(year, month) {
      if (new Date(year, parseInt(month) - 1, 1).getDay() - 1 == -1) return 6;
      else return new Date(year, parseInt(month) - 1, 1).getDay() - 1;
    },
    getLastDayOfMonth(year, month) {
      return new Date(year, parseInt(month) + 1, 0).getDay();
    },
    populateCalendar(year, month) {
      this.calendarDays = [];
      const firstDayOfMonth = this.getFirstDayOfMonth(year, month);
      const numberOfRows = Math.ceil(
        this.getNumberOfDaysInMonth(year, month) / 7
      );
      let dayNumber = 1;
      // Number of rows to display
      let increment = 1;
      for (let x = 0; x <= numberOfRows; x++) {
        let decrement = 0;
        let row = [];
        let endOfMonth = false;
        // Fills the first row with previous month ending days
        if (x == 0) {
          for (let i = 0; i < firstDayOfMonth; i++) {
            if (parseInt(month) == 1)
              row.push({
                day:
                  this.getNumberOfDaysInPreviousMonth(year, month) - decrement,
                month: this.getPreviousMonth(month),
                year: parseInt(year) - 1
              });
            else
              row.push({
                day:
                  this.getNumberOfDaysInPreviousMonth(year, month) - decrement,
                month: this.getPreviousMonth(month),
                year: parseInt(year)
              });
            decrement++;
          }
          row.reverse();
        }
        // Fills the rest of the rows
        for (
          let y = row.length;
          y < 7 && y < this.getNumberOfDaysInMonth(year, month);
          y++
        ) {
          // While current month days are not excedeed
          if (dayNumber <= this.getNumberOfDaysInMonth(year, month)) {
            row.push({ day: dayNumber, month: month, year: year });
            dayNumber++;
          } else {
            // Fills space left
            for (let j = row.length; j < 7; j++) {
              if (parseInt(month) == 12)
                row.push({
                  day: increment,
                  month: this.getNextMonth(month),
                  year: parseInt(year) + 1
                });
              else
                row.push({
                  day: increment,
                  month: this.getNextMonth(month),
                  year: year
                });
              increment++;
              let t = row;
            }
          }
        }
        this.calendarDays.push(row);
      }
    },
    setPreviousMonth() {
      let activeYear = this.activeDate.substr(0, 4);
      let activeMonth = this.activeDate.substr(4, 2);
      if (parseInt(activeMonth) == 1) {
        activeYear = parseInt(activeYear) - 1;
        activeMonth = "12";
      } else {
        activeMonth = ("0" + (parseInt(activeMonth) - 1)).slice(-2);
      }
      this.activeDate = activeYear + activeMonth;
      this.populateCalendar(activeYear, activeMonth);
      this.animeSwipeRight();
    },
    setNextMonth() {
      let activeYear = this.activeDate.substr(0, 4);
      let activeMonth = this.activeDate.substr(4, 2);
      if (parseInt(activeMonth) == 12) {
        activeYear = parseInt(activeYear) + 1;
        activeMonth = "01";
      } else {
        activeMonth = ("0" + (parseInt(activeMonth) + 1)).slice(-2);
      }
      this.activeDate = activeYear + activeMonth;
      this.populateCalendar(activeYear, activeMonth);
      this.animeSwipeLeft();
    },
    selectDay(cell) {
      if (cell.month == this.getPreviousMonth(this.activeDate.substr(4, 2))) {
        this.setPreviousMonth();
      } else if (
        cell.month == this.getNextMonth(this.activeDate.substr(4, 2))
      ) {
        this.setNextMonth();
      }
      this.activeDay = ("0" + cell.day).slice(-2) + cell.month + cell.year;
      this.date =
        cell.month + "/" + ("0" + cell.day).slice(-2) + "/" + cell.year;
      this.$emit("input", this.date);
    },
    isSelected(cell) {
      if (cell.month + ("0" + cell.day).slice(-2) + cell.year == this.activeDay)
        return true;
    },
    isDisabled(cell) {
      if (parseInt(cell.month) !== parseInt(this.activeDate.substr(4, 2)))
        return true;
    },
    animeSwipeLeft() {
      this.swipeLeft = true;
      setTimeout(() => {
        this.swipeLeft = false;
      }, 300);
    },
    animeSwipeRight() {
      this.swipeRight = true;
      setTimeout(() => {
        this.swipeRight = false;
      }, 300);
    }
  },
  mounted() {
    this.populateCalendar(2019, 1);
    this.activeDate = this.getCurrentYear() + this.getCurrentMonth();
  },
  props: {
    value: String
  },
  created() {
    this.date = this.value;
  }
};
</script>
