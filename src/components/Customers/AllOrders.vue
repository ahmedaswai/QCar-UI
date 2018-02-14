<template>
    <div>
        <div class="block-header">
            <h2>جميع طلبات العملاء</h2>
        </div>
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="card transparent-card">
                    <div class="table-btns">
                        <button
                            class="btn btn-danger btn-circle waves-effect waves-circle waves-float will-fade-in"
                            :class="{'fade-toggle': selectTotDeleteItems.length > 0}"
                            data-toggle="modal"
                            data-target="#bulkDelete">
                            <i class="material-icons">delete</i>
                        </button>
                        <button class="btn btn-info btn-circle waves-effect waves-circle waves-float open-search" @click="toggleSearch">
                            <i class="material-icons">search</i>
                        </button>
                        <router-link :to="{path: '/customers/new-order'}"
                            class="btn btn-primary btn-circle waves-effect waves-circle waves-float"
                            data-toggle="modal"
                            data-target="#new">
                            <i class="material-icons">add</i>
                        </router-link>
                    </div>

                    <search></search>

                    <div class="table-wrapper card">
                        <div class="table-loader text-center" style="padding: 20px;" v-if="searching">
                            <div class="preloader pl-size-md ltr">
                                <div class="spinner-layer pl-red-grey">
                                    <div class="circle-clipper left">
                                        <div class="circle"></div>
                                    </div>
                                    <div class="circle-clipper right">
                                        <div class="circle"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <table class="table table-striped" v-else>
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>إسم العميل</th>
                                <th>أرقام الهواتف</th>
                                <th class="text-center">توقيت الطلب</th>
                                <th>مسح</th>
                                <th>تفاصيل</th>
                                <th class="text-center">أضف رحلة للطلب</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(order, i) in orders" :key="order.id">
                                    <th scope="row">{{i + 1}}</th>
                                    <td>{{order.customer.fullName || 'غير محدد'}}</td>
                                    <td>{{order.customer.mobileNumber1}} - {{order.customer.mobileNumber2}} - {{order.customer.homePhoneNumber}}</td>
                                    <td class="text-center">
                                        {{order.orderTime | formatDate}}
                                    </td>
                                    <td>
                                        <div>
                                            <div class="i-checks">
                                                <input :id="`checkboxCustom_${i}`" type="checkbox" class="checkbox-template chk-col-red" @change="addToBulkDelete($event, order.id)">
                                                <label :for="`checkboxCustom_${i}`"></label>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <a
                                            data-toggle="modal"
                                            data-target="#details"
                                            class="btn btn-info"
                                            @click="details(order)"
                                        >
                                            <i class="material-icons">list</i>
                                        </a>
                                    </td>
                                    <td class="text-center">
                                        <a
                                            data-toggle="modal"
                                            data-target="#newTrip"
                                            class="btn btn-success"
                                            @click="setOrderForNewTrip(order)"
                                        >
                                            <i class="material-icons">drive_eta</i>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div><!--/card-->
            </div><!--/col-lg-12 col-md-12 col-sm-12 col-xs-12-->
        </div><!--row-->

        <!-- Modal-->
        <div id="bulkDelete" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" class="modal fade text-left">
            <div role="document" class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 id="exampleModalLabel" class="modal-title">حذف</h4>
                        <button type="button" data-dismiss="modal" aria-label="Close" class="close"><span aria-hidden="true">×</span></button>
                    </div>
                    <div class="modal-body text-right">
                        <h4>هل انت متاكد انك تريد الحذف؟</h4>
                    </div>
                    <div class="modal-footer">
                        <button type="button" data-dismiss="modal" class="btn btn-secondary">لا</button>
                        <button type="button" class="btn btn-danger" @click="deleteSelected">نعم, إحذف ما تم إختياره</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Details -->
        <div id="details" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" class="modal fade text-left">
            <div role="document" class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 id="exampleModalLabel" class="modal-title">تفاصيل الطلب</h4>
                        <button type="button" data-dismiss="modal" aria-label="Close" class="close"><span aria-hidden="true">×</span></button>
                    </div>
                    <div class="modal-body text-right row">
                        
                        <div class="clearfix"></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" data-dismiss="modal" class="btn btn-secondary">إغلاق</button>
                    </div>
                </div>
            </div>
        </div><!--/details-->


        <addTrip :orderForNewTrip="orderForNewTrip"></addTrip>


    </div>
</template>

<script>
import search from "../parts/_search";
import mapModal from "../parts/map_modal";
import addTrip from "../parts/addTrip";

export default {
  name: "all-orders",
  components: {
    search,
    mapModal,
    addTrip
  },
  data() {
    return {
      orders: [],
      selectTotDeleteItems: [],
      searching: false,
      orderForNewTrip: {}
    };
  },
  mounted() {
    this.getData();

    setTimeout(() => {
      $(".modal").modal("hide");
    }, 400);
  },
  methods: {
    setOrderForNewTrip(order) {
      this.orderForNewTrip = order;
    },
    toggleSearch() {
      $(".table-search").slideToggle("fast");
    },
    getData() {
      this.$get("/api/orders")
        .then(res => {
          console.log(res);
          this.orders = res.rs;
          setTimeout(() => {
            this.$initTable();
          }, 100);
        })
        .catch(err => {
          console.log(err);
        });
    },
    addToBulkDelete(e, id) {
      if (this.selectTotDeleteItems.indexOf(id) === -1) {
        this.selectTotDeleteItems.push(id);
      } else {
        this.selectTotDeleteItems.splice(
          this.selectTotDeleteItems.indexOf(id),
          1
        );
      }
    },
    deleteSelected() {
      this.$deleteBulk("/api/orders/delete/bulk", [
        ...this.selectTotDeleteItems
      ])
        .then(res => {
          console.log(res);
          $(".modal").modal("hide");
          this.getData();
        })
        .catch(err => {
          console.log(err);
        });
    },
    details(order) {
      console.log(this.details, order);
      this.detailsObj = order;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
