<template>
<div>
    <h2 class="text-center p-2">{{editMode ? "Edit Product" :"Add Product"}}
    </h2>

         <div class="form-group">
           <label for="">Name</label>
           <input type="text" class="form-control" v-model="product.name">
         </div>
         <div class="form-group">
           <label for="">Description</label>
           <textarea  class="form-control" v-model="product.description"></textarea>
         </div>
          <div class="form-group">
           <label for="">Price</label>
           <input type="text" class="form-control" v-model="product.price" />
         </div>
          <div class="form-group">
           <label for="">Image</label>
           <input type="file" class="form-control" @change="onFileSelected">
         </div>
         <div class="form-group">
           <label for="">Category</label>
           <select class="form-control" @change="onChange">
             <option :value="null">Choose a category</option>
             <option v-for="(c,i) in categories" :key="i" :value="c.id" :selected="c.
             id ==product.category.id">
             {{ c.name }}
             </option>
             </select>
         </div>
</div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import ProductPagination from "../ProductPagination.vue";


export default {
  data(){
    return {
        product: {
          name: null,
          description: null,
          price: null,
          image: null,
          category: null,
        }
    }
  },
  computed: {
    ...mapState(["categories"]),
  },
  methods: {
      ...mapMutations(["setCurrentCategory"]),
      ...mapActions(["setProductsByCategoryAction"]),
      handleEdit(product){
          this.$router.push(`/admin/products/edit/${product.id}`);
      },
  },
  created() {
    this.setCurrentCategory("all");
      this.setProductsByCategoryAction("all");
  },
};
</script>

