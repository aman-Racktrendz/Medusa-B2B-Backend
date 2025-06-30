import type {
    SubscriberArgs,
    SubscriberConfig,
  } from "@medusajs/framework"
  import { Modules } from "@medusajs/framework/utils"
  
  export default async function productCreateHandler({
    event: { data },
    container,
  }: SubscriberArgs<{ id: string }>) {
    const notificationModuleService = container.resolve(Modules.NOTIFICATION)
    const productModuleService = container.resolve(Modules.PRODUCT)
  
    const product = await productModuleService.retrieveProduct(data.id)
  
    await notificationModuleService.createNotifications({
      to: "gauritcanada@gmail.com",
      channel: "email",
      template: "d-fb5795abb770412781453df51bd5ef2e",
      data: {
        product_title: product.title,
        //product_image: product.images[0]?.url,
      },
    })
  }
  
  export const config: SubscriberConfig = {
    event: "product.created",
  }