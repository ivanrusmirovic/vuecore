<template>
<div>
    <h2>Orders</h2>

          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>E-mail</th>
                <th>Addres</th>
                <th>Order Content</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(o, i) in orders" :key="i">
                <td class="align-middle">{{o.id}}</td>
                <td class="align-middle">{{o.name}}</td>
                <td class="align-midle">{{o.email}}</td>
                <td class="align-midle">{{o.address}}</td>
                <td class="align-midle">{{o.ordercontent}}</td>
                <td class="align-midle">{{o.total}}</td>
                <td class="align-midle">
                  <ul class="list-group">
                    <li class="list-group-item" v-for="(item, index) in JSON.parse
                    (o.cart)" :key="index">
                        {{item.product.name}}
                        {{item.product.price | currency}}
                        {{ "x" + item.quantity }}
                    </li>
                  </ul>
                </td>
                <td class="align-middle">
                  {{ o.total | currency }}
                </td>
              </tr>
            </tbody>
          </table>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';


export default {
  computed: {
    ...mapState({orders: state => state.orders.orders}),
  },
  methods: {
      ...mapActions({setOrderAction: "orders/setOrdersAction"}),
  },
  created() {
    this.setOrderAction();
  }
};
</script>

