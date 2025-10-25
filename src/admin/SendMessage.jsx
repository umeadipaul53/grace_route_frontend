import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { sendAdminMessage } from "../reducers/messageReducer";
import { useToast } from "../toastContext/useToast";

export default function SendMessage() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.message);
  const { showToast } = useToast();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const e = {};

    if (!formData.email.trim()) e.email = "Please enter your email.";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      e.email = "Please enter a valid email address.";

    if (!formData.subject.trim())
      e.subject = "Please enter subject of your message.";
    if (!formData.message.trim()) e.message = "Please write a message.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eobj = validate();
    setErrors(eobj);
    if (Object.keys(eobj).length) return;

    try {
      const res = await dispatch(sendAdminMessage(formData)).unwrap();
      setFormData({ email: "", subject: "", message: "" });
      showToast(res.message, "success");
    } catch (err) {
      showToast(err.message || "something went wrong", "error");
    }
  };

  return (
    <div className="mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        <Send className="text-blue-600" size={22} />
        Send a Message
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Recipient */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Recipient Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. user@example.com"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Enter message subject"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Type your message here..."
            rows="6"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send size={18} />
                Send Message
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
