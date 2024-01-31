app.component('product-display', {
  setup(){
    const image = ref('./assets/images/t-shirt-blue.png');
    const changeImage = (variantImage) => {
      image.value = variantImage
    }

    const product_title = 'T-shirt';
    const brand = 'MyBrand';
    const titleWithBrand = computed(() => {
      return product_title + " " + brand;

    });

    const inStock = 20;
    const inStockComputed = computed(() => {
      if(inStock >= 10) {
        return "In stock"
      } else if(inStock < 10 && inStock >= 1) {
        return "Almost of out"
      } else {
        return "Out of stock"
      }
    });

    return {
      image,
      details: ['50% cotton', '30% polyester', '20% wool'],
      variants: [
        {id:1, color:'blue', image: "./assets/images/t-shirt-blue.png"},
        {id:2, color:'green', image: "./assets/images/t-shirt-green.png"}
      ],
      changeImage,
      titleWithBrand,
      inStockComputed
    }
  },
  template:
  `<div class="product-display">
    <div class="product-container">
      <div class="product-image">
          <!-- <img v-bind:src="image" alt="img-product"> -->
        <img :src="image" alt="img-product">
      </div>
      <div class="product-info">
        <h1>{{ titleWithBrand }}</h1>
        <h1>{{ inStockComputed }}</h1>
        <ul>
          <li v-for="detail in details">
            {{ detail }}
          </li>
        </ul>
        <div 
          v-for="variant in variants" 
          :key="variant.id"
          v-on:mouseover="changeImage(variant.image)"
          class="color-circle"
          :style="{ backgroundColor: variant.color }">
        </div>

        <button 
        class="button" 
        :class="{ disabledButton : inStock < 1}"
        @click="$emit('add-to-cart')"
        :disabled="inStock < 1">Add to cart</button>
      </div>
    </div>
  </div>`
})