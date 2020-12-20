Subscribing to scroll events can cause performance and concurrency issues because when scrolling, hundreds of events can be triggered.
A performant way to react to scroll events is the Interaction Observer.

The Interaction Observer observes if an element is visible within another element. In this case a element is added to the end of the list. When it becomes visible inside of the window element, a "load more" event is triggered.

### Phoenix LiveView
In the the template, add  an HTML element **after** the list. The position of the element will be observed within the window.

```elixir
defmodule DemoWeb.UserLive.IndexAutoScroll do
  use Phoenix.LiveView

  alias DemoWeb.UserLive.Row

  def render(assigns) do
    ~L"""
    <table>
      <tbody id="users" phx-update="append">
        <%= for user <- @users do %>
          <%= live_component @socket, Row, id: "user-#{user.id}", user: user %>
        <% end %>
      </tbody>
    </table>
    <div phx-hook="InfiniteScroll" data-page="<%= @page %>"></div>
    """
  end

  def mount(_params, _session, socket) do
    {:ok,
     socket
     |> assign(page: 1, per_page: 10)
     |> fetch(), temporary_assigns: [users: []]}
  end

  defp fetch(%{assigns: %{page: page, per_page: per}} = socket) do
    assign(socket, users: Demo.Accounts.list_users(page, per))
  end

  def handle_event("load-more", _, %{assigns: assigns} = socket) do
    {:noreply, socket |> assign(page: assigns.page + 1) |> fetch()}
  end
end
```


### Javascript  Hook 
This hook initializes an Interaction Observer and triggers a "load-more" event once the added element becomes visible within the window.

```js
export const InfiniteScroll = {
  page() {
    return this.el.dataset.page;
  },
  loadMore(entries) {
    const target = entries[0];

    if (target.isIntersecting && this.pending == this.page()) {
      this.pending = this.page() + 1;
      this.pushEvent("load-more", {});
    }
  },
  mounted() {
    this.pending = this.page();
    this.observer = new IntersectionObserver(
      (entries) => this.loadMore(entries),
      {
        root: null, // window by default
        rootMargin: "0px",
        threshold: 1.0,
      }
    );
    this.observer.observe(this.el);
  },
  beforeDestroy() {
    this.observer.unobserve(this.el);
  },
  updated() {
    this.pending = this.page();
  },
};
```

Use the hook like any other hook in LiveView.

```js
import {InfiniteScroll} from "./infinite_scroll"

// ...

let liveSocket = new LiveSocket("/live", Socket, {hooks: {InfiniteScroll}, params: {_csrf_token: csrfToken}})
```


### Sources
- Elixir Forum [How can I implement an infinite scroll in liveview?](https://elixirforum.com/t/how-can-i-implement-an-infinite-scroll-in-liveview/30457/2)
- Mozilla developer [Interaction Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

#PhoenixLiveView
#published 
