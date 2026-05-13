<?php
namespace App\Http\Controllers;
use App\Models\Order;
use App\Models\Book;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        return response()->json(
            Order::with(['customer', 'items.book'])->latest()->get()
        );
    }

    public function store(Request $request)
    {
        $customer = $request->user();
        $total    = 0;
        $order    = Order::create([
            'customer_id'  => $customer->id,
            'total_amount' => 0,
            'status'       => 'pending'
        ]);

        foreach ($request->items as $item) {
            $book   = Book::findOrFail($item['book_id']);
            $price  = $book->price;
            $total += $price * $item['quantity'];

            $order->items()->create([
                'book_id'  => $book->id,
                'quantity' => $item['quantity'],
                'price'    => $price,
            ]);

            $book->decrement('quantity', $item['quantity']);
        }

        $order->update(['total_amount' => $total]);
        return response()->json($order->load('items.book'), 201);
    }

    public function myOrders(Request $request)
    {
        $orders = Order::with('items.book')
            ->where('customer_id', $request->user()->id)
            ->latest()
            ->get();
        return response()->json($orders);
    }

    public function updateStatus(Request $request,int $id)
    {
        $order = Order::findOrFail($id);
        $order->update(['status' => $request->status]);
        return response()->json($order);
    }
}