When a input field is in focus, any changes that are done to the value won't be applied. This is done to avoid changes from the server overwriting the value a user is typing.

However sometimes it is handy to set the value anyway, for example when accepting a query suggestion in a search autocomplete UI.

### Hook
Add a hook that reacts on events from the server:
```js
const ForceInputValue = {
  mounted() {
    this.handleEvent(
      "force-input-value",
      ({ value }) => (this.el.value = value)
    );
  },
};

let liveSocket = new LiveSocket("/live", Socket, {
  hooks: { ForceInputValue },
  params: { _csrf_token: csrfToken },
});
```

### Template
Add the hook to the input field:
```html
<input
    phx-hook="ForceInputValue"
    id="search-input"
    value="<%= @query %>" />
    name="query" />
```

### LiveView
Push an event to the client when you want to force a value on an input even though it is in focus. 

```elixir
  def handle_event(
    "accept-suggestion",
    %{"key" => "ArrowRight"},
    %{assigns: %{suggestion: suggestion}} = socket
  ) do
  {:noreply, socket |> push_event("force-input-value", %{value: suggestion})}
end

```

### Sources
- Inspired by this [comment](https://github.com/phoenixframework/phoenix_live_view/issues/624#issuecomment-585230754)

#PhoenixLiveView
#published