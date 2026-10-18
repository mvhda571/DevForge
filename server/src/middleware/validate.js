import { badRequest } from '../utils/http.js';

function format(issues) {
  return issues.map((i) => ({ path: i.path.join('.'), message: i.message }));
}

export function validate({ body, query, params } = {}) {
  return (req, _res, next) => {
    if (params) {
      const r = params.safeParse(req.params);
      if (!r.success) throw badRequest('Manzil parametrlari noto‘g‘ri', format(r.error.issues));
      req.params = r.data;
    }
    if (query) {
      const r = query.safeParse(req.query);
      if (!r.success) throw badRequest('So‘rov parametrlari noto‘g‘ri', format(r.error.issues));
      req.q = r.data;
    }
    if (body) {
      const r = body.safeParse(req.body ?? {});
      if (!r.success) throw badRequest('Kiritilgan ma’lumotlarni tekshiring', format(r.error.issues));
      req.body = r.data;
    }
    next();
  };
}
