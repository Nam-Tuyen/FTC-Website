export function ChatHeader() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-4xl mx-auto text-center">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
          {/* icon placeholder retained by page using lucide Bot above header if needed */}
          <svg className="h-8 w-8 text-primary-foreground"/>
        </div>
        <h1 className="font-heading font-bold text-4xl sm:text-5xl text-foreground mb-6">
          <span className="bg-gradient-to-r from-accent via-secondary to-accent bg-clip-text text-transparent animate-pulse uppercase tracking-wide">AI CHATBOT</span>
        </h1>
        <p className="text-xl text-muted-foreground text-pretty">
          <em>Trợ lý AI thông minh giúp bạn tìm hiểu về câu lạc bộ và các kiến thức Fintech</em>
        </p>
      </div>
    </section>
  )
}
