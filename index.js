import tableData from "./tableData.js";
import select from "./select.js";
import inputForm from "./inputForm.js"


var vm = new Vue({
	el: "#app1",
	data() {
		return {
			tableData: tableData,
			select: select,
			inputForm: inputForm,
			showTable: true,
			tableLoading: false,
		
			currentPage: 1, // 当前页码
			total: '', // 总条数
			pageSize: 10 // 每页的数据条数	
		}
	},

	methods: {
		show: function (event) {
			this.showTable = true
			this.tableLoading = false
			setTimeout(() => this.tableLoading = false, 1000)
			this.tableLoading = true
		},
		// 多選，輸入tableData(這個一定要)，key換成自己要的欄位
		multipleSelect: function (tableData, key) {
			return inputForm[key].length == 0 ? true : this.inputForm[key].some(el => tableData[key].includes(el))
		},
		// 滑條 slider，輸入tableData(這個一定要)，key換成自己要的欄位
		range: function (tableData, key) {
			return (tableData[key] >= this.inputForm[key].value[0] && tableData[key] <= this.inputForm[key].value[1])
		},
		// 給app使用時間的
		rangeAppTime: function (tableData, key) {
			return tableData[key] >= 12 ? true : (tableData[key] >= this.inputForm[key].value[0] && tableData[key] <= this.inputForm[key].value[1])
		},
		// 不用range，只有一個值的slider
		slider: function (tableData, key) {
			return (tableData[key] <= this.inputForm[key].value)
		},
		// 兩層級選擇器，只要用tableData就可以了，其他寫死
		cascader: function (tableData) {
			return inputForm.mostActPlace.length == 0 ? true : inputForm.mostActPlace.some(el =>
				tableData.mostActPlace[0].includes(el[0]) &&
				tableData.mostActPlace[1].includes(el[1])
			)
		},


		handleSizeChange(val) {
			this.currentPage = 1;
			this.pageSize = val;
		},
		handleCurrentChange(val) {
			this.currentPage = val;
		}


	},
	computed: {
		filtered: function () {
			var filteredData = this.tableData.filter(tableData =>

				this.multipleSelect(tableData, "sex") &&
				this.range(tableData, "age") &&
				this.multipleSelect(tableData, "jobType") &&
				this.multipleSelect(tableData, "mostVehicle") &&
				this.range(tableData, "avgWalkTime") &&
				this.range(tableData, "avgMotoTime") &&
				this.range(tableData, "avgBusTime") &&
				this.range(tableData, "avgMetroTime") &&
				this.range(tableData, "avgCarTime") &&
				this.slider(tableData, "googleMapUpdate") &&
				this.range(tableData, "useCash") &&
				this.range(tableData, "useCreditCard") &&
				this.range(tableData, "useEasyCard") &&
				this.range(tableData, "useMobilePay") &&
				this.multipleSelect(tableData, "mostPayWay") &&
				this.range(tableData, "avgMonthCost") &&
				this.multipleSelect(tableData, "mostBuyPlace") &&
				this.slider(tableData, "invoiceVehicleUpdate") &&
				this.multipleSelect(tableData, "avgGetupTime") &&
				this.multipleSelect(tableData, "avgSleepTime") &&
				this.multipleSelect(tableData, "avgOutTime") &&
				this.multipleSelect(tableData, "avgHomeTime") &&
				this.range(tableData, "avgHomeDuration") &&
				this.range(tableData, "avgOutDuration") &&
				this.slider(tableData, "lifeUpdate") &&
				this.multipleSelect(tableData, "mostUseApp") &&
				this.rangeAppTime(tableData, "sportAppUseTime") &&
				this.rangeAppTime(tableData, "healthAppUseTime") &&
				this.rangeAppTime(tableData, "shoppingAppUseTime") &&
				this.rangeAppTime(tableData, "entertainmentAppUseTime") &&
				this.rangeAppTime(tableData, "educationAppUseTime") &&
				this.rangeAppTime(tableData, "photoAppUseTime") &&
				this.rangeAppTime(tableData, "travelAppUseTime") &&
				this.rangeAppTime(tableData, "socialAppUseTime") &&
				this.rangeAppTime(tableData, "finaceAppUseTime") &&
				this.cascader(tableData)
			)
			// var data30 = filteredData.slice(0, 30)
			return filteredData
		},
		count: function () {
			this.total = this.filtered.length
			return this.filtered.length
		}
	}
})